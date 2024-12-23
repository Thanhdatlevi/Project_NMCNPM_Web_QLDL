const db = require('../../config/db');

class FacilityModel {
    static async getFacilityById(facilityId) {
        try {

            const query = `SELECT provider_id, facility_name, description, location_id, contact, status, specific_location
                FROM facilities
                WHERE facility_id = $1;
            `;
            const result = await db.query(query, [facilityId]);

            if (result.rows.length > 0) {
                const facility = {
                    providerId: result.rows[0].provider_id,
                    facilityName: result.rows[0].facility_name,
                    description: result.rows[0].description,
                    locationId: result.rows[0].location_id,
                    contact: result.rows[0].contact,
                    status: result.rows[0].status,
                    specificLocation: result.rows[0].specific_location
                };
                return facility;
            }
            return null;
        } catch (error) {
            console.log("Error in FacilityModel.getFacilityById: ", error);
            throw error;
        }
    }
    static async updateFacility(facilityId, facilityName, description, locationId, contact, status, specificLocation) {
        try {
            let fieldsToUpdate = [];
            let values = [];
            let index = 1;
            if (facilityName !== undefined) {
                fieldsToUpdate.push(`facility_name = $${index}`);
                values.push(facilityName);
                index++;
            }
            if (description !== undefined) {
                fieldsToUpdate.push(`description = $${index}`);
                values.push(description);
                index++;
            }
            if (locationId !== undefined) {
                fieldsToUpdate.push(`location_id = $${index}`);
                values.push(locationId);
                index++;
            }

            if (contact !== undefined) {
                fieldsToUpdate.push(`contact = $${index}`);
                values.push(contact);
                index++;
            }
            if (status !== undefined) {
                fieldsToUpdate.push(`status = $${index}`);
                values.push(status);
                index++;
            }

            if (specificLocation !== undefined) {
                fieldsToUpdate.push(`specific_location = $${index}`);
                values.push(specificLocation);
                index++;
            }
            if (fieldsToUpdate.length === 0) {
                return false;
            }

            const query = `
            UPDATE facilities
            SET ${fieldsToUpdate.join(', ')}
            WHERE facility_id = $${index}
            RETURNING *;
            `;
            values.push(facilityId);
            const result = await db.query(query, values);
            if (result.rowCount > 0) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.log("Error in FacilityModel.updateFacility: ", error);
            throw error;
        }
    }

    static async deleteFacility(facilityId) {
        try {
            const query = `DELETE FROM facilities WHERE facility_id = $1`;
            const result = await db.query(query, [facilityId]);
            if (result.rowCount > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error in facilityModel.deleteFacility:", error.message);
            throw error;
        }
    }

    static async #insertFacility(providerId, facilityName, description, locationId, contact, specificLocation, client) {
        try {
            const query = `INSERT INTO Facilities (provider_id, facility_name, description, location_id, contact, specific_location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING facility_id;`;
            const values = [providerId, facilityName, description, locationId, contact, specificLocation];
            const result = await client.query(query, values);
            return result.rows[0]?.facility_id || null;
        } catch (error) {
            console.error("Error in facilityModel.#insertFacility:", error.message);
            throw error;
        }
    }

    static async #insertFacilityImages(facilityId, facilityImgs, client) {
        try {
            const query = `
            INSERT INTO facility_images (facility_id, img_url) 
            VALUES ${facilityImgs.map((_, index) => `($1, $${index + 2})`).join(', ')};
        `;
            const values = [facilityId, ...facilityImgs];
            await client.query(query, values);
        } catch (error) {
            console.error("Error in facilityModel.#insertFacilityImages:", error.message);
            throw error;
        }
    }

    static async createFacility(providerId, facilityName, description, locationId, contact, specificLocation, facilityImgs) {
        const client = await db.beginTransaction();
        try {
            const facilityId = await FacilityModel.#insertFacility(
                providerId,
                facilityName,
                description,
                locationId,
                contact,
                specificLocation,
                client
            );
            if (!facilityId) {
                await db.rollbackTransaction(client);
                return null;
            }
            if (facilityImgs.length > 0) {
                await FacilityModel.#insertFacilityImages(facilityId, facilityImgs, client);
            }
            await db.commitTransaction(client);
            return facilityId;
        } catch (error) {
            await db.rollbackTransaction(client);
            console.error('Error in FacilityModel.createFacility:', error.message);
            throw error;
        }
    }
}

module.exports = FacilityModel;