import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { UserService } from './user/services/user.service';
import { ProfilesService } from './profile/services/profile.service';
import { setDefaultProfiles } from './user/config/default-profile';
import { setDefaultUser } from './user/config/default-users';

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
    ProfileModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _userService: UserService,
    private readonly _profileService: ProfilesService,
  ) {
    setDefaultProfiles(_configService, _profileService);
    setDefaultUser(_configService, _userService, _profileService);
  }
}
