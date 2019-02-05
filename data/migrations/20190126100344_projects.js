exports.up = function(knex, Promise) {
    return knex.schema.createTable(
        'projects', table => {
            table.increments();
            table.string('project_name').notNullable();
            table.string('project_description');
            table.boolean('project_completed')
            // god bless the knex docs
        }
    )
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('projects')
  
};

