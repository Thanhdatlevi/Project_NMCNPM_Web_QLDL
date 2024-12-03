/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('reservations', function (table) {
            table.string('reserve_id', 10).primary();
            table.specificType('tourist_id', 'char(4)').notNullable();
            table.date('reservation_date').notNullable();
            table.enu('status', ['waiting', 'reserved', 'cancel']).notNullable();
            table.decimal('total_amount', 10, 2).notNullable().defaultTo(0.00);
            table.foreign('tourist_id').references('tourists.tourist_id');
        })
        .createTable('detail_reservations', function (table) {
            table.string('facility_id', 4);
            table.string('reserve_id', 10);
            table.integer('quantity').notNullable();
            table.decimal('price', 10, 2).notNullable();
            table.date('reservation_date').notNullable();
            table.time('reservation_time').notNullable();
            table.decimal('total_price', 10, 2);
            table.primary(['facility_id', 'reserve_id']);
            table.foreign('reserve_id').references('reservations.reserve_id');
        })
        .raw(`
      CREATE OR REPLACE FUNCTION calculate_total_price() 
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.total_price := NEW.quantity * NEW.price;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_calculate_total_price
      BEFORE INSERT ON detail_reservations
      FOR EACH ROW EXECUTE FUNCTION calculate_total_price();
    `)
        .raw(`
      CREATE OR REPLACE FUNCTION update_total_amount()
      RETURNS TRIGGER AS $$
      BEGIN
        -- Tính tổng tiền từ bảng detail_reservations
        UPDATE reservations
        SET total_amount = (
          SELECT COALESCE(SUM(dr.total_price), 0)
          FROM detail_reservations dr
          WHERE dr.reserve_id = NEW.reserve_id
        )
        WHERE reserve_id = NEW.reserve_id;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER update_total_amount_trigger
      AFTER INSERT OR UPDATE OR DELETE ON detail_reservations
      FOR EACH ROW
      EXECUTE FUNCTION update_total_amount();
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('detail_reservations')
        .dropTableIfExists('reservations')
        .raw(`
      DROP FUNCTION IF EXISTS calculate_total_price();
      DROP FUNCTION IF EXISTS update_total_amount();
      DROP TRIGGER IF EXISTS trigger_calculate_total_price ON detail_reservations;
      DROP TRIGGER IF EXISTS update_total_amount_trigger ON detail_reservations;
    `);
};
