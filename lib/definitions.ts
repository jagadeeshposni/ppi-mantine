// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type PriceData = {
  transfer_date: string;
  price: string;
};

export type PriceDataByPropertyType = {
  transfer_date: string;
  terraced: string;
  semi_detached: string;
  detached: string;
  flats: string;
};

export type SampleData = {
  month: string;
  price: number;
};
