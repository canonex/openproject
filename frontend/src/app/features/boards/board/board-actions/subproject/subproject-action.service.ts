import { Injectable } from "@angular/core";
import { QueryResource } from "core-app/core/hal/resources/query-resource";
import { HalResource } from "core-app/core/hal/resources/hal-resource";
import { UserResource } from 'core-app/core/hal/resources/user-resource';
import { CollectionResource } from 'core-app/core/hal/resources/collection-resource';
import { WorkPackageChangeset } from "core-components/wp-edit/work-package-changeset";
import { WorkPackageResource } from "core-app/core/hal/resources/work-package-resource";
import { SubprojectBoardHeaderComponent } from "core-app/features/boards/board/board-actions/subproject/subproject-board-header.component";
import { CachedBoardActionService } from "core-app/features/boards/board/board-actions/cached-board-action.service";
import { ImageHelpers } from "core-app/shared/helpers/images/path-helper";
import { buildApiV3Filter } from "core-app/shared/helpers/api-v3/api-v3-filter-builder";

@Injectable()
export class BoardSubprojectActionService extends CachedBoardActionService {
  filterName = 'onlySubproject';

  text =  this.I18n.t('js.boards.board_type.board_type_title.subproject');

  description = this.I18n.t('js.boards.board_type.action_text_subprojects');

  label = this.I18n.t('js.boards.add_list_modal.labels.subproject');

  icon = 'icon-projects';

  image = ImageHelpers.imagePath('board_creation_modal/subproject.svg');

  localizedName = this.I18n.t('js.work_packages.properties.subproject');

  headerComponent() {
    return SubprojectBoardHeaderComponent;
  }

  canMove(workPackage:WorkPackageResource):boolean {
    // We can only move the work package
    // if the `move` (move between projects) is allowed.
    return !!workPackage.move;
  }

  assignToWorkPackage(changeset:WorkPackageChangeset, query:QueryResource) {
    const href = this.getActionValueId(query, true);
    changeset.setValue('project', { href: href });
  }

  protected loadUncached():Promise<HalResource[]> {
    const currentProjectId = this.currentProject.id!;
    return this
      .apiV3Service
      .projects
      .filtered(buildApiV3Filter('ancestor', '=', [currentProjectId]))
      .get()
      .toPromise()
      .then((collection:CollectionResource<UserResource>) => collection.elements);
  }

}