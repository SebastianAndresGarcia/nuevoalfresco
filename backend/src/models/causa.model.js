module.exports = (sequelize, Sequelize) => {
    const Causa = sequelize.define("causas", {
        dni: {
            type: Sequelize.BIGINT,
        },
        nombrecompleto: {
            type: Sequelize.STRING
        },

        ubicacion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fecha: {
            type: Sequelize.DATE
        },
        hashmd5: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        
        //createdAt: false,
        //updatedAt: false
    },{timestamps: false}); 
    return Causa;
}; 