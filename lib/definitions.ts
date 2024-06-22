// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.


export type PriceDataByPropertyType = {
  transfer_date: string;
  terraced: string;
  semi_detached: string;
  detached: string;
  flats: string;
};

export type PricePaidDataByPostCode  = {
  transfer_date: string;
  price: number;
  property_type: string;
  soan: string;
  paon: string;
  street: string;
  city: string;
  county: string;
  age: string;

};

// transfer_date, 
//     price, 
//     soan, 
//     paon,  
//     street, 
//     city, 
//     county 
