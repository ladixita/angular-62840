import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([]),
  ]
})
export class UsersModule { }
