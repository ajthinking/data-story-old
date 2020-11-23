import { computed, observable } from "mobx"

export class Store {
    story = observable.box('projects.data.units')

    set story(name) {
        this.story = name;
    }
}

let store = window.store = new Store;

export default store