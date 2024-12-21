const db = require('../../config/db');
const ProviderModel = require('./providerModel');
const FacilityModel = require('../facility/facilityModel');
const HotelModel = require('../hol/hotelModel');
const RestaurantModel = require('../restaurant/restaurantModel');
const AccountModel = require('../account/accountModel')
class ProviderService {

    static async updateHotel(hotelId, accountId, updateData) {
        const client = await db.beginTransaction();
        try {
            const [facilityId, providerId] = await Promise.all([
                HotelModel.getFacilityIdByHotelId(hotelId),
                AccountModel.getProviderId(accountId)
            ]);

            const facility = await FacilityModel.getFacilityById(facilityId);
            if (providerId !== facility.providerId) {
                await db.rollbackTransaction(client);
                return { success: false, message: "Bạn không có quyền chỉnh sửa dữ liệu khách sạn này!" }
            }

            const { facilityData, hotelData } = updateData;
            const updatePromises = [];

            if (facilityData) {
                const updatedFacilityData = {
                    facilityName: facilityData?.facilityName || undefined,
                    description: facilityData?.description || undefined,
                    locationId: facilityData?.locationId || undefined,
                    contact: facilityData?.contact || undefined,
                    status: facilityData?.status || undefined,
                    specificLocation: facilityData?.specificLocation || undefined,
                };

                updatePromises.push(
                    FacilityModel.updateFacility(
                        facilityId,
                        updatedFacilityData.facilityName,
                        updatedFacilityData.description,
                        updatedFacilityData.locationId,
                        updatedFacilityData.contact,
                        updatedFacilityData.status,
                        updatedFacilityData.specificLocation
                    )
                );
            }
            if (hotelData) {
                const updatedHotelData = {
                    amenities: hotelData?.amenities || undefined,
                    averagePrice: hotelData?.averagePrice || undefined,
                };

                updatePromises.push(
                    HotelModel.updateHotel(
                        hotelId,
                        updatedHotelData.amenities,
                        updatedHotelData.averagePrice
                    )
                );
            }
            await Promise.all(updatePromises);
            await db.commitTransaction(client);
            return { success: true, message: "Cập nhật khách sạn thành công!" };
        } catch (error) {
            await db.rollbackTransaction(client);
            throw error;
        }
    }

    static async updateRestaurant(restaurantId, accountId, updateData) {
        const client = await db.beginTransaction();
        try {
            const [facilityId, providerId] = await Promise.all([
                RestaurantModel.getFacilityIdByRestaurantId(restaurantId),
                AccountModel.getProviderId(accountId)
            ]);
            const facility = await FacilityModel.getFacilityById(facilityId);
            if (providerId !== facility.providerId) {
                await db.rollbackTransaction(client);
                return { success: false, message: "Bạn không có quyền chỉnh sửa dữ liệu nhà hàng này!" }
            }
            const { facilityData, restaurantData } = updateData;
            const updatePromises = [];
            if (facilityData) {
                const updatedFacilityData = {
                    facilityName: facilityData?.facilityName || undefined,
                    description: facilityData?.description || undefined,
                    locationId: facilityData?.locationId || undefined,
                    contact: facilityData?.contact || undefined,
                    status: facilityData?.status || undefined,
                    specificLocation: facilityData?.specificLocation || undefined,
                };

                updatePromises.push(
                    FacilityModel.updateFacility(
                        facilityId,
                        updatedFacilityData.facilityName,
                        updatedFacilityData.description,
                        updatedFacilityData.locationId,
                        updatedFacilityData.contact,
                        updatedFacilityData.status,
                        updatedFacilityData.specificLocation
                    )
                );
            }
            if (restaurantData) {
                const updatedRestaurantData = {
                    amenities: restaurantData?.amenities || undefined,
                    averagePrice: restaurantData?.averagePrice || undefined,
                };
                updatePromises.push(
                    RestaurantModel.updateRestaurant(
                        restaurantId,
                        updatedRestaurantData.amenities,
                        updatedRestaurantData.averagePrice
                    )
                );
            }
            await Promise.all(updatePromises);
            await db.commitTransaction(client);
            return { success: true, message: "Cập nhật nhà hàng thành công!" };
        } catch (error) {
            await db.rollbackTransaction(client);
            throw error;
        }
    }

    static async requestHotel(accountId, requestData) {
        try {
            const providerId = await AccountModel.getProviderId(accountId);
            await ProviderModel.addRequestHotel(
                providerId,
                requestData.facilityName,
                requestData.description,
                requestData.specificLocation,
                requestData.contact,
                requestData.imageUrls,
                requestData.roomsNum,
                requestData.locationId
            );
            return { success: true, message: "Yêu cầu đã được gửi đến admin." };
        } catch (error) {
            console.error("Error in providerService.requestHotel:", error.message);
            return { success: false, message: "Có lỗi xảy ra, vui lòng thử lại sau." };
        }
    }

    static async requestRestaurant(accountId, requestData) {
        try {
            // Lấy providerId từ accountId
            const providerId = await AccountModel.getProviderId(accountId);

            // Thêm yêu cầu vào bảng restaurants
            await ProviderModel.addRequestRestaurant(
                providerId,
                requestData.facilityName,
                requestData.description,
                requestData.specificLocation,
                requestData.contact,
                requestData.noteContent,
                requestData.imageUrls,
                requestData.tablesNum,
                requestData.locationId
            );

            // Trả về thông báo thành công
            return { success: true, message: "Yêu cầu đã được gửi đến admin." };
        } catch (error) {
            console.error("Error in providerService.requestRestaurant:", error.message);
            return { success: false, message: "Có lỗi xảy ra, vui lòng thử lại sau." };
        }
    }



}

module.exports = ProviderService