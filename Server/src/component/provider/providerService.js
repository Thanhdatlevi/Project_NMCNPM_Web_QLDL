const db = require('../../config/db');
const ProviderModel = require('./providerModel');

const FacilityService = require('../facility/facilityService');
const HotelService = require('../hol/hotelService');
const AccountService = require('../account/accountService');
const RestaurantService = require('../restaurant/restaurantService');

class ProviderService {

    static async updateHotel(hotelId, accountId, updateData) {
        const client = await db.beginTransaction();
        try {
            const [facilityId, providerId] = await Promise.all([
                HotelService.getFacilityIdByHotelId(hotelId),
                AccountService.getProviderId(accountId)
            ]);

            const facility = await FacilityService.getFacilityById(facilityId);
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
                    FacilityService.updateFacility(
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
                    HotelService.updateHotel(
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
                RestaurantService.getFacilityIdByRestaurantId(restaurantId),
                AccountService.getProviderId(accountId)
            ]);
            const facility = await FacilityService.getFacilityById(facilityId);
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
                    FacilityService.updateFacility(
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
                    RestaurantService.updateRestaurant(
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
            const providerId = await AccountService.getProviderId(accountId);
            await ProviderModel.addRequestHotel(
                providerId,
                requestData.facilityName,
                requestData.description,
                requestData.specificLocation,
                requestData.contact,
                requestData.imageUrls,
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
            const providerId = await AccountService.getProviderId(accountId);

            // Thêm yêu cầu vào bảng restaurants
            await ProviderModel.addRequestRestaurant(
                providerId,
                requestData.facilityName,
                requestData.description,
                requestData.specificLocation,
                requestData.contact,
                requestData.imageUrls,
                requestData.locationId
            );

            // Trả về thông báo thành công
            return { success: true, message: "Yêu cầu đã được gửi đến admin." };
        } catch (error) {
            console.error("Error in providerService.requestRestaurant:", error.message);
            return { success: false, message: "Có lỗi xảy ra, vui lòng thử lại sau." };
        }
    }

    static async deleteFacility(accountId, facilityId) {
        try {
            const [facility, provider] = await Promise.all([
                FacilityService.getFacilityById(facilityId),
                AccountService.getProviderId(accountId)
            ]);
            if (!facility) {
                return { success: false, message: "Facility không tồn tại." };
            }
            if (provider !== facility.provider_id) {
                return { success: false, message: "Bạn không có quyền xóa facility này." };
            }
            const deletedFacility = await FacilityService.deleteFacility(facilityId);
            if (!deletedFacility) {
                return { success: false, message: "Facility không tồn tại." };
            }
            return { success: true, message: "Facility đã được xóa thành công." };

        } catch (error) {
            console.error("Error in ProviderService.deleteFacility:", error.message);
            throw error;
        }
    }

    static async getHotelsByProviderId(accountId) {
        try {
            const providerId = await AccountService.getProviderId(accountId);
            const hotels = await HotelService.getHotelsByProviderId(providerId);
            return hotels;
        } catch (error) {
            console.log("Error in getHotelsByProviderId in hotelService:", error);
            throw new Error("Unable to fetch hotels by provider.");
        }
    }

    static async getRestaurantByProviderId(accountId) {
        try {
            const providerId = await AccountService.getProviderId(accountId);
            const restaurants = await RestaurantService.getRestaurantByProviderId(providerId);
            return restaurants;
        } catch (error) {
            console.log("Error in ProviderService.getRestaurantByProviderId:", error);
            throw new Error("Unable to fetch restaurants by provider.");
        }
    }

    static async getHotelById_provider(holId) {
        try {
            const hotel = await HotelService.getHotelById_provider(holId);
            return hotel;
        } catch (error) {
            console.error("Error in ProviderService.getHotelById_provider: ", error.message);
            throw new Error("Unable to retrieve restaurant information");
        }
    }

    static async getRestaurantById_provider(resId) {
        try {
            const restaurant = await RestaurantService.getRestaurantById_provider(resId);
            return restaurant;
        } catch (error) {
            console.error("Error in ProviderService.getRestaurantById_tourist: ", error.message);
            throw new Error("Unable to retrieve restaurant information");
        }
    }
}

module.exports = ProviderService