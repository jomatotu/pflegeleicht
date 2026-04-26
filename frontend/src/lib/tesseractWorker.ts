import {createWorker, Worker} from "tesseract.js";

let worker: Worker;

export async function getWorker(): Promise<Worker> {
    if (!worker) {
        worker = await createWorker("deu");
    }
    return worker;
}