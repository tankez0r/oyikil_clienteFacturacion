import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasOne, Model, NotEmpty, PrimaryKey, Table } from 'sequelize-typescript';
import { mailObject } from '../../types/types';

@Table({tableName:'clientes', timestamps: false})
  export class cliente extends Model{
  
   @NotEmpty
   @AllowNull(false)
   @Column(DataType.CHAR)
    declare dni: string;
   
    @NotEmpty
    @AllowNull(false)
    @PrimaryKey
    @Column(DataType.CHAR)
    declare idcustomer: string;
    @NotEmpty
    @AllowNull(false)
    @Column(DataType.CHAR)
    declare name: string;
    @HasOne( ()=> correo )
    declare correo: mailObject
}

@Table({tableName:'correos', timestamps: false})
export class correo extends Model{
  
    @NotEmpty
    @AllowNull(false)
    @PrimaryKey
    @ForeignKey(()=> cliente)
    @Column(DataType.CHAR)
    declare idcustomer: string
    @BelongsTo(()=> cliente)
    declare cliente: cliente

    @NotEmpty
    @AllowNull(false)
    @Column(DataType.CHAR)
declare password: string
  
    @NotEmpty
    @AllowNull(false)
    @Column(DataType.CHAR)
declare mail: string
}


 