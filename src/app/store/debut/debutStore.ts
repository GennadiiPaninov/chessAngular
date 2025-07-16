import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { fullDebutInterface } from '@core/models/debut-models/debut-models';
import { handleHttpError } from '@core/helpers/handle-http-errors';
import { GlobalStore } from '../global/globalStore';
import { DebutsHttpService } from '@core/services/debuts/debuts-http.service';
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
export class DebutStore {
  private global = inject(GlobalStore);
  private service = inject(DebutsHttpService);
  private moveService = inject(MoveHttpService);
  private debutSignal = signal<fullDebutInterface>({} as fullDebutInterface);
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
  readonly debut = computed(() => this.debutSignal());
  readonly firstMoves = computed(() => this.debutSignal().firstMoves);
  readonly showModal = computed(() => this.showModalSignal());
  readonly isWhite = computed(() => this.debutSignal().side === 'White');
  readonly orientation = computed(() => this.debutSignal().side?.toLowerCase());
  readonly modalFen = computed(() => this.newMoveSignal().fen);
  readonly lastTwoFens = computed(() => this.newMoveSignal().fens);
  readonly isMine = computed(() => {
    return this.debutSignal().isMine;
  });
  readonly selectedMove = computed(() => this.selectedMoveSignal());
  readonly hoverMoveData = computed(() => this.hoverMoveSignal());
  async load(id: string) {
    this.global.toggleLoader(true);
    try {
      const result = await firstValueFrom(this.service.findOne(id));
      console.log(result);
      this.debutSignal.set(result as fullDebutInterface);
    } catch (err: unknown) {
      handleHttpError(this.global, err, 'Не удалось загрузить дебют');
    } finally {
      this.global.toggleLoader(false);
    }
  }

  async createFMove(moveData: createMoveFormI) {
    // в зависимостри от стороны разные title
    this.global.toggleLoader(true);
    try {
      const title = this.isWhite()
        ? `${moveData.mFrom}-${moveData.mTo} : ${moveData.eFrom}-${moveData.eTo}`
        : `${moveData.eFrom}-${moveData.eTo} : ${moveData.mFrom}-${moveData.mTo}`;
      const notation = `1. ${title},`;
      const move: createFMoveT = {
        debutId: this.debut().id,
        fen: this.modalFen(),
        fens: this.lastTwoFens(),
        pieces: this.newMoveSignal().pieces,
        title: title,
        desc: moveData.desc,
        side: this.debutSignal().side,
        notation: notation,
      };

      const result = await firstValueFrom(this.moveService.createMove(move));
      this.closeModal();
      this.debutSignal.update((prev) => ({ ...prev, firstMoves: [...prev.firstMoves, result] }));
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
      this.debutSignal.update((prev) => ({
        ...prev,
        firstMoves: prev.firstMoves.filter((el) => el.id !== this.selectedMove().id),
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
      this.debutSignal.update((prev) => ({
        ...prev,
        firstMoves: prev.firstMoves.map((el) => {
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
    if (obj.hasOwnProperty('fens')) {
      obj.fens?.unshift('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    }
    this.newMoveSignal.update((prev) => ({ ...prev, ...obj }));
  }
  resetNewMoveSignal() {
    this.newMoveSignal.set({
      fen: 'start',
      fens: [],
      pieces: [],
    });
  }
  onHoverMoveItem(move: moveInterface) {
    this.hoverMoveSignal.update((prev) => ({ ...prev, fen: move.fen, fens: move.fens }));
  }
  onLeaveMoveItem() {
    this.hoverMoveSignal.set({
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      fens: [],
    });
  }
}
