import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

export interface IModalData {
	component: Type<any>;
	context: { [key: string]: any };
}

@Injectable()
export class ModalService {
	private _sequence = new Subject<IModalData | null>();

	public get modalSequence() {
		return this._sequence.asObservable();
	}

	public open(data: IModalData): void {
		this._sequence.next(data);
	}

	public close(): void {
		this._sequence.next(null);
	}
}
