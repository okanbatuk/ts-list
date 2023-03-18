import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  clear = (): void => {
    this.ul.innerHTML = "";
  };

  render = (fullList: FullList): void => {
    this.clear();

    fullList.list.forEach((item) => {
      // Create li (list item) as Html Element
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      // Create input which type of checkbox
      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = item.id;
      check.tabIndex = 0; // it is not necessary
      check.checked = item.checked;
      li.append(check);

      // Change event for check status of item
      check.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });

      // Create label as Html Element
      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      // Create button for delete
      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "X";
      li.append(button);

      // Create remove item event
      button.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      this.ul.append(li);
    });
  };
}
