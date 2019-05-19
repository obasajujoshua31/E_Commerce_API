import authenticate from '../middlewares/authenticate';
import hashPassword, { comparePassword } from '../utils/password';

export default (sequelize, Sequelize) => {
  const customerSchema = {
    customer_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    address_1: {
      type: Sequelize.STRING,
    
    },
    address_2: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    region: {
      type: Sequelize.STRING
    },
    postal_code: {
      type: Sequelize.STRING
    },
    day_phone: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
    },
    shipping_region_id: {
      type: Sequelize.INTEGER
    },
    eve_phone: {
      type: Sequelize.STRING
    },
    mob_phone: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING,
    },
    credit_card: {
      type: Sequelize.STRING
    }
  };

  const customer = sequelize.define("customer", customerSchema, {
    freezeTableName: true,
    timestamps: false,
    hooks: {
      beforeCreate: (user) => {
          user.password = hashPassword(user.password);
          return user.password;
      }
    }
  });
  

  customer.associate = db => {
    customer.hasOne(db.shipping_region, {
      foreignKey: 'shipping_region_id',
      target: 'shipping_region_id',
      onDelete: 'CASCADE'
    });
  };

  customer.prototype.generateToken = function() {
    return authenticate.generateToken(this.customer_id);
  };

  customer.prototype.confirmPassword = function(password) {
     return comparePassword(password, this.password);
  };


  customer.prototype.updateCustomerFields = async function(user) {
    const { name, email, password, day_phone, eve_phone, mob_phone } = user;
    this.name = name;
    this.email = email;
    this.password = hashPassword(password);
    this.day_phone = day_phone;
    this.eve_phone = eve_phone;
    this.mob_phone = mob_phone;
    await this.save();
    await this.reload();
    return this;
  };
  
  customer.prototype.updateCustomerCreditCard = async function(user) {
    this.credit_card = user.credit_card;
    await this.save();
    await this.reload();
    return this;
  };


  customer.prototype.updateCustomerAddress = async function(user) {
    const { address_1, address_2, city, region, postal_code, country, shipping_region_id } = user;
    this.address_1 = address_1;
    this.address_2 = address_2;
    this.city = city;
    this.country = country;
    this.shipping_region_id = shipping_region_id;
    await this.save();
    await this.reload();
    return this;
  };

  return customer;
};
