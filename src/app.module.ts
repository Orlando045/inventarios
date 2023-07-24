import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import { RawMaterialModule } from './raw_material/raw_material.module';
import { RegisterOutputsModule } from './register_outputs/register_outputs.module';
import { RecepcionModule } from './recepcion/recepcion.module';
import { ShelfModule } from './shelf/shelf.module';
// import { StoreModule } from './store/store.module';
import { InventoryModule } from './inventory/inventory.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { RecipeModule } from './recipe/recipe.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { ManufactureOrderModule } from './manufacture-order/manufacture-order.module';
import { RawMaterialRequiredModule } from './raw-material-required/raw-material-required.module';
import { RawMaterialUsedModule } from './raw-material-used/raw-material-used.module';
import { LoteOfProductsModule } from './lote-of-products/lote-of-products.module';
import { ScannedOrderModule } from './scanned-order/scanned-order.module';
import { PackageScannedModule } from './package-scanned/package-scanned.module';
import { UserModule } from './user/user.module';
import { PerfilModule } from './perfil/perfil.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    RawMaterialModule,
    RegisterOutputsModule,
    RecepcionModule,
    ShelfModule,
    InventoryModule,
    WarehouseModule,
    RecipeModule,
    ProductsModule,
    OrderModule,
    ManufactureOrderModule,
    RawMaterialRequiredModule,
    RawMaterialUsedModule,
    LoteOfProductsModule,
    ScannedOrderModule,
    PackageScannedModule,
    UserModule,
    PerfilModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
