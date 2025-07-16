import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { handleHttpError } from '@core/helpers/handle-http-errors';
import { GlobalStore } from '../global/globalStore';
import { showModalType } from '@core/models/common-models/modal-models';
import {
  createFMoveT,
  createMoveFormI,
  hoverMoveSignalT,
  moveInterface,
  newMoveSignalT,
  updateNewMovesSignalT,
} from '@core/models/move-models/move-models';
import { MoveHttpService } from '@core/services/move/move-http.service';

@Injectable({ providedIn: 'any' })
export class MoveStore {
  private global = inject(GlobalStore);
  private moveService = inject(MoveHttpService);
  private moveSignal = signal<moveInterface>({} as moveInterface);
  private selectedMoveSignal = signal<moveInterface>({} as moveInterface);
  private hoverMoveSignal = signal<hoverMoveSignalT>({
    fen: '',
    fens: [],
  });
  private showModalSignal = signal<showModalType>({
    createModal: false,
    updateModal: false,
    deleteModal: false,
    moveModal: false,
  });
  private newMoveSignal = signal<newMoveSignalT>({
    fen: '',
    fens: [],
    pieces: [],
  });
  readonly move = computed(() => this.moveSignal());
  readonly children = computed(() => this.moveSignal().children);
  readonly hasChildren = computed(() => this.moveSignal().children?.length == 0);
  readonly showModal = computed(() => this.showModalSignal());
  readonly isWhite = computed(() => this.moveSignal().side === 'White');
  readonly orientation = computed(() => this.moveSignal().side?.toLowerCase());
  readonly modalFen = computed(() => this.newMoveSignal().fen);
  readonly lastTwoFens = computed(() => this.newMoveSignal().fens);
  readonly isMine = computed(() => this.moveSignal().isMine);
  readonly moveLastTwoFens = computed(() => this.newMoveSignal().fens);
  readonly moveFen = computed(() => this.newMoveSignal().fen);
  readonly selectedMove = computed(() => this.selectedMoveSignal());
  readonly hoverMoveData = computed(() => this.hoverMoveSignal());

  async load(id: string) {
    this.global.toggleLoader(true);
    try {
      const result = await firstValueFrom(this.moveService.getMove(id));
      this.moveSignal.set(result as moveInterface);
      this.newMoveSignal.update((prev) => {
        return { ...prev, fen: result.fen, fens: result.fens };
      });
      this.hoverMoveSignal.set({
        fen: result.fen,
        fens: result.fens,
      });
      console.log(result);
    } catch (err: unknown) {
      handleHttpError(this.global, err, 'Не удалось загрузить ход');
    } finally {
      this.global.toggleLoader(false);
    }
  }

  async createMove(moveData: createMoveFormI) {
    console.log(moveData);
    // в зависимостри от стороны разные title
    this.global.toggleLoader(true);
    try {
      const title = this.isWhite()
        ? `${moveData.mFrom}-${moveData.mTo} : ${moveData.eFrom}-${moveData.eTo}`
        : `${moveData.eFrom}-${moveData.eTo} : ${moveData.mFrom}-${moveData.mTo}`;
      console.log(title);
      // const notation = `1. ${title},`
      const notation = `${this.move().notation} ${(this.move().notation.match(/,/g) || []).length + 1}. ${title},`;

      const move: createFMoveT = {
        parentId: this.move().id,
        fen: this.modalFen(),
        fens: this.lastTwoFens(),
        pieces: this.newMoveSignal().pieces,
        title: title,
        desc: moveData.desc,
        side: this.moveSignal().side,
        notation: notation,
      };
      console.log(title, move);
      const result = await firstValueFrom(this.moveService.createMove(move));
      this.closeModal();
      this.moveSignal.update((prev) => ({ ...prev, children: [...(prev.children ?? []), result] }));
      this.global.createNotification('Ход успешно создан');
    } catch (err: unknown) {
      handleHttpError(this.global, err, 'Не удалось добавить ход');
    } finally {
      this.global.toggleLoader(false);
    }
  }

  async deleteMove() {
    this.global.toggleLoader(true);
    try {
      await firstValueFrom(this.moveService.deleteMove(this.selectedMove().id as string));
      this.global.createNotification('Ход успешно удален');
      this.moveSignal.update((prev) => ({
        ...prev,
        children: prev.children?.filter((el) => el.id !== this.selectedMove().id),
      }));
      this.closeModal();
    } catch (err: unknown) {
      handleHttpError(this.global, err, 'Не удалось добавить ход');
    } finally {
      this.global.toggleLoader(false);
    }
  }

  async updateMove(desc: string) {
    this.global.toggleLoader(true);
    try {
      await firstValueFrom(this.moveService.updateMove(this.selectedMove().id as string, desc));
      this.moveSignal.update((prev) => ({
        ...prev,
        children: prev.children?.map((el) => {
          if (el.id == this.selectedMove().id) {
            el.desc = desc;
          }
          return el;
        }),
      }));
      this.global.createNotification('Ход успешно обновлен');
      this.closeModal();
    } catch (err: unknown) {
      handleHttpError(this.global, err, 'Не удалось добавить ход');
    } finally {
      this.global.toggleLoader(false);
    }
  }

  openModal(modal: string, move?: moveInterface) {
    this.showModalSignal.update((prev) => ({ ...prev, [modal]: true }));
    if (move) this.selectedMoveSignal.set(move);
  }

  closeModal() {
    this.showModalSignal.update((modals) => {
      const updatedModals = { ...modals };
      (Object.keys(updatedModals) as Array<keyof showModalType>).forEach((key) => {
        updatedModals[key] = false;
      });

      return updatedModals;
    });
    this.resetNewMoveSignal();
  }

  setNewMoveSignal(obj: updateNewMovesSignalT) {
    console.log(obj);
    if (obj.hasOwnProperty('fens')) {
      obj.fens?.unshift(this.move().fens[this.move().fens.length - 1]);
    }
    this.newMoveSignal.update((prev) => ({ ...prev, ...obj }));
  }

  resetNewMoveSignal() {
    this.newMoveSignal.set({
      fen: this.move().fen,
      fens: this.move().fens,
      pieces: [],
    });
  }
  onHoverMoveItem(move: moveInterface) {
    this.hoverMoveSignal.set({
      fen: move.fen,
      fens: move.fens,
    });
  }
  onLeaveMoveItem() {
    this.hoverMoveSignal.set({
      fen: this.move().fen,
      fens: this.move().fens,
    });
  }
}
