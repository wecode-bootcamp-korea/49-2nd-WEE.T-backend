const { AppDataSource } = require("./dataSource");

    const getTrainingList = async() => {
        await AppDataSource.query(`
            SELECT
                users.id
                
        `)
    }


module.exports = {

}