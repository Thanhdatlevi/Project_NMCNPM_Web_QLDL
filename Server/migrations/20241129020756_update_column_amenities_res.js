/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.alterTable("restaurants", (table) => {
        table.text("amenities");
    });
    await knex("restaurants").update({
        amenities: knex.raw(`CONCAT(opening_hours, ' - ', cuisine_type)`),
    });
    await knex.schema.alterTable("restaurants", (table) => {
        table.dropColumn("opening_hours");
        table.dropColumn("cuisine_type");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.alterTable("restaurants", (table) => {
        table.string("opening_hours", 50);
        table.string("cuisine_type", 50);
    });
    // Phân tách lại dữ liệu từ amenities
    const restaurants = await knex("restaurants").select("restaurant_id", "amenities");

    for (const restaurant of restaurants) {
        const [opening_hours, cuisine_type] = restaurant.amenities.split(" - ");
        await knex("restaurants")
            .where({ restaurant_id: restaurant.restaurant_id })
            .update({
                opening_hours,
                cuisine_type,
            });
    }

    // Xóa cột amenities
    await knex.schema.alterTable("restaurants", (table) => {
        table.dropColumn("amenities");
    });
};
