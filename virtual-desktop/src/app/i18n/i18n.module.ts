/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

import { NgModule, APP_INITIALIZER, LOCALE_ID, Inject } from '@angular/core';
import { LanguageLocaleService } from './language-locale.service';
import { localeInitializer, localeIdFactory } from './locale-initializer.provider';
import { HttpClientModule } from '@angular/common/http';
import { TranslationModule, TRANSLATION_CONFIG, LocaleConfig, ISOCode, L10nLoader, TranslationConfig, LOCALE_CONFIG } from 'angular-l10n';
import { L10nStorageService } from './l10n-storage.service';
import { L10nConfigService } from './l10n-config.service';

@NgModule({
  imports: [
    HttpClientModule,
    TranslationModule.forRoot({
      locale: {},
      translation: {
        providers: [],
        composedLanguage: [ISOCode.Language, ISOCode.Country],
        caching: true
      }},
      { localeStorage: L10nStorageService }
    )
  ],
  providers: [
    L10nConfigService,
    L10nStorageService,
    { provide: LOCALE_ID, useFactory: localeIdFactory, deps: [LanguageLocaleService]},
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: localeInitializer,
      deps: [LanguageLocaleService, LOCALE_ID]
    }
  ]
})
export class I18nModule {
  constructor(
    private l10nLoader: L10nLoader,
    @Inject(LOCALE_CONFIG) private localeConfig: LocaleConfig,
    @Inject(TRANSLATION_CONFIG) private translationConfig: TranslationConfig,
    private l10nConfigService: L10nConfigService,
  ) {
    this.localeConfig.defaultLocale = this.l10nConfigService.getDefaultLocale();
    this.translationConfig.providers = this.l10nConfigService.getTranslationProviders();
    this.l10nLoader.load();
  }

}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

