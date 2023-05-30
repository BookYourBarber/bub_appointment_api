module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define("Appointment", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        timeslot_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customer_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return Appointment;
};
