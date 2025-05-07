import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import { environment } from '../environments/environment';
import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/services/auth/auth.interceptor";
import {provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {globalReducer} from "./store/global/global.reducer";
import {provideStoreDevtools, StoreDevtoolsModule} from "@ngrx/store-devtools";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({global: globalReducer}),
    provideEffects(),
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
};
