//-- copyright
// OpenProject is an open source project management software.
// Copyright (C) 2012-2021 the OpenProject GmbH
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See docs/COPYRIGHT.rdoc for more details.
//++
import {FormsModule} from '@angular/forms';
import {Injector, NgModule} from '@angular/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {NgOptionHighlightModule} from '@ng-select/ng-option-highlight';
import {DragulaModule} from 'ng2-dragula';
import {DynamicModule} from 'ng-dynamic-component';
import {StateService, UIRouterModule} from '@uirouter/angular';
import {HookService} from '../modules/plugins/hook-service';
import {OpenprojectAccessibilityModule} from 'core-app/shared/directives/a11y/openproject-a11y.module';
import {CurrentUserModule} from 'core-app/core/current-user/current-user.module';
import {IconModule} from 'core-app/shared/components/icon/icon.module';
import {AttributeHelpTextModule} from 'core-app/shared/components/attribute-help-texts/attribute-help-text.module';

import {IconTriggeredContextMenuComponent} from 'core-app/shared/components/op-context-menu/icon-triggered-context-menu/icon-triggered-context-menu.component';
import {CurrentProjectService} from 'core-app/core/current-project/current-project.service';
import {SortHeaderDirective} from 'core-app/features/work_packages/components/wp-table/sort-header/sort-header.directive';
import {ZenModeButtonComponent} from 'core-app/features/work_packages/components/wp-buttons/zen-mode-toggle-button/zen-mode-toggle-button.component';
import {OPContextMenuComponent} from 'core-app/shared/components/op-context-menu/op-context-menu.component';
import {BoardVideoTeaserModalComponent} from 'core-app/features/boards/board/board-video-teaser-modal/board-video-teaser-modal.component';
import {highlightColBootstrap} from './directives/highlight-col/highlight-col.directive';
import {HighlightColDirective} from './directives/highlight-col/highlight-col.directive';
import {CopyToClipboardDirective} from './components/copy-to-clipboard/copy-to-clipboard.directive';
import {OpDateTimeComponent} from './components/date/op-date-time.component';
import {NotificationComponent} from './components/notifications/notification.component';
import {NotificationsContainerComponent} from './components/notifications/notifications-container.component';
import {UploadProgressComponent} from './components/notifications/upload-progress.component';
import {ResizerComponent} from './components/resizer/resizer.component';
import {CollapsibleSectionComponent} from './components/collapsible-section/collapsible-section.component';
import {NoResultsComponent} from './components/no-results/no-results.component';
import {ScrollableTabsComponent} from './components/tabs/scrollable-tabs/scrollable-tabs.component';
import {ContentTabsComponent} from './components/tabs/content-tabs/content-tabs.component';
import {EditableToolbarTitleComponent} from './components/editable-toolbar-title/editable-toolbar-title.component';
import {PersistentToggleComponent} from './components/persistent-toggle/persistent-toggle.component';
import {AddSectionDropdownComponent} from './components/hide-section/add-section-dropdown/add-section-dropdown.component';
import {HideSectionLinkComponent} from './components/hide-section/hide-section-link/hide-section-link.component';
import {RemoteFieldUpdaterComponent} from './components/remote-field-updater/remote-field-updater.component';
import {AutofocusDirective} from './directives/autofocus/autofocus.directive';
import {ShowSectionDropdownComponent} from './components/hide-section/show-section-dropdown.component';
import {SlideToggleComponent} from './components/slide-toggle/slide-toggle.component';
import {DynamicBootstrapModule} from './components/dynamic-bootstrap/dynamic-bootstrap.module';
import {OpFormFieldComponent} from './components/forms/form-field/form-field.component';
import {OpFormBindingDirective} from './components/forms/form-field/form-binding.directive';
import {OpOptionListComponent} from './components/option-list/option-list.component';
import {OpenprojectPrincipalRenderingModule} from "core-app/shared/components/principal/principal-rendering.module";
import { DatePickerModule } from "core-app/shared/components/op-date-picker/date-picker.module";
import { FocusModule } from "core-app/shared/directives/focus/focus.module";
import { EnterpriseBannerComponent } from "core-app/shared/components/enterprise-banner/enterprise-banner.component";
import { EnterpriseBannerBootstrapComponent } from "core-app/shared/components/enterprise-banner/enterprise-banner-bootstrap.component";
import { HomescreenNewFeaturesBlockComponent } from "core-app/features/homescreen/blocks/new-features.component";
import { TablePaginationComponent } from "core-app/shared/components/table-pagination/table-pagination.component";


export function bootstrapModule(injector:Injector) {
  // Ensure error reporter is run
  const currentProject = injector.get(CurrentProjectService);
  const routerState = injector.get(StateService);

  window.ErrorReporter.addContext((scope) => {
    if (currentProject.inProjectContext) {
      scope.setTag('project', currentProject.identifier!);
    }

    scope.setExtra('router state', routerState.current.name);
  });

  const hookService = injector.get(HookService);
  hookService.register('openProjectAngularBootstrap', () => {
    return [
      highlightColBootstrap
    ];
  });
}

@NgModule({
  imports: [
    // UI router components (NOT routes!)
    UIRouterModule,
    // Angular browser + common module
    CommonModule,
    // Angular Forms
    FormsModule,
    // Angular CDK
    PortalModule,
    DragDropModule,
    DragulaModule,
    // Our own A11y module
    OpenprojectAccessibilityModule,
    CurrentUserModule,
    NgSelectModule,
    NgOptionHighlightModule,

    DynamicBootstrapModule,
    OpenprojectPrincipalRenderingModule,

    DatePickerModule,
    FocusModule,
    IconModule,
    AttributeHelpTextModule,
  ],
  exports: [
    // Re-export all commonly used
    // modules to DRY
    UIRouterModule,
    CommonModule,
    FormsModule,
    PortalModule,
    DragDropModule,
    IconModule,
    AttributeHelpTextModule,
    OpenprojectAccessibilityModule,
    NgSelectModule,
    NgOptionHighlightModule,
    DynamicBootstrapModule,
    OpenprojectPrincipalRenderingModule,

    DatePickerModule,
    FocusModule,
    OpDateTimeComponent,
    AutofocusDirective,

    // Notifications
    NotificationsContainerComponent,
    NotificationComponent,
    UploadProgressComponent,
    OpDateTimeComponent,

    // Table highlight
    HighlightColDirective,

    ResizerComponent,

    TablePaginationComponent,
    SortHeaderDirective,

    ZenModeButtonComponent,

    OPContextMenuComponent,
    IconTriggeredContextMenuComponent,

    NoResultsComponent,

    EditableToolbarTitleComponent,

    // Enterprise Edition
    EnterpriseBannerComponent,

    DynamicModule,

    // filter

    SlideToggleComponent,

    // Autocompleter
    OpFormFieldComponent,
    OpFormBindingDirective,
    OpOptionListComponent,
  ],
  declarations: [
    OpDateTimeComponent,
    AutofocusDirective,

    // Notifications
    NotificationsContainerComponent,
    NotificationComponent,
    UploadProgressComponent,
    OpDateTimeComponent,

    OPContextMenuComponent,
    IconTriggeredContextMenuComponent,

    // Table highlight
    HighlightColDirective,

    // Add functionality to rails rendered templates
    CopyToClipboardDirective,
    CollapsibleSectionComponent,

    CopyToClipboardDirective,
    ResizerComponent,

    TablePaginationComponent,
    SortHeaderDirective,

    // Zen mode button
    ZenModeButtonComponent,

    NoResultsComponent,

    EditableToolbarTitleComponent,

    PersistentToggleComponent,
    HideSectionLinkComponent,
    ShowSectionDropdownComponent,
    AddSectionDropdownComponent,
    RemoteFieldUpdaterComponent,

    // Enterprise Edition
    EnterpriseBannerComponent,
    EnterpriseBannerBootstrapComponent,

    HomescreenNewFeaturesBlockComponent,
    BoardVideoTeaserModalComponent,

    //filter
    SlideToggleComponent,

    OpFormFieldComponent,
    OpFormBindingDirective,
    OpOptionListComponent,
  ]
})
export class OPSharedModule {
  constructor(injector:Injector) {
    bootstrapModule(injector);
  }
}

