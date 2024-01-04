import {faker} from '@faker-js/faker'

const module1 = {

  catClicker() {

    let count = 0;

    const app: any = document.querySelector('#app');
    const img = document.createElement('img');
    //const button = document.createElement('button');
    let counter = `
    <p
    style="font-size: 24px; font-weight: bold; color: green;"
    >
      ${count}
    </p>
    `;
    const temp = document.createElement('div');
    temp.innerHTML = counter.trim();

    img.src = 'https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg?s=612x612&w=0&k=20&c=vvM97wWz-hMj7DLzfpYRmY2VswTqcFEKkC437hxm3Cg=';
    img.alt = 'cat picture';
    img.style.width = '200px';
    img.style.height = '200px';
    img.style.objectFit = 'cover';
    img.style.border = '2px solid blue';
    img.style.cursor = 'pointer';

    /* button.textContent = 'click me';
    button.style.fontSize = '18px';
    button.style.cursor = 'pointer'; */

    const onClick = () => {
      count += 1;
      counter = `
      <p
      style="font-size: 24px; font-weight: bold; color: green;"
      >
        ${count}
      </p>
      `;
      temp.innerHTML = counter.trim();
      console.log('img was clicked!!', count);
    };

    img.addEventListener('click', onClick);

    if (app) {
      app.style.display = 'flex';
      app.style.gap = '10px';
  
      app.appendChild(img);
      app.appendChild(temp);
      //app?.appendChild(button);
    }



  },

  /* 
  Cat Clicker Requirements 2

  New Project Requirements for Cat Clicker
  Visuals
  The application should display two cats. Each cat includes
  the cat's name
  a picture of the cat
  text showing the number of clicks
  The specifics of the layout do not matter, so style it however you'd like.
  Interaction
  The number of clicks should increment when each cat picture is clicked.
  */

  catClicker2() {

    class Cat {
      private count: number;
      private img: string;
      // container
      private containerEl: any;
      // image element
      private imageEl: any;
      // show counter element 
      private counterEl: any;

      constructor() {
        this.count = 0;
        this.img = '';
        this.getCatImg();

        this.createContainerEl();
        
        // in eventListener function: bound this with call or use arrowFunc
        this.containerEl.addEventListener('click', this.onClick);
      }

      public increment() {
        this.count += 1;
      }

      public decrement() {
        if (this.count >= 0) this.count -= 1;
      }

      get catEl() {
        return this.containerEl;
      }

      private onClick = () => {
        this.increment();
        this.updateCounterEl();
      }

      private createContainerEl() {
        this.containerEl = document.createElement('div');
        this.containerEl.style.display = 'flex';
        this.containerEl.style.flexDirection = 'column';
        this.containerEl.style.gap = '10px';
        this.containerEl.style.cursor = 'pointer';
      }

      private createImageEl() {
        this.imageEl = document.createElement('img');
        this.imageEl.src = this.img;
        this.imageEl.alt = 'cat image';
        this.imageEl.style.objectFit = 'cover';
        this.imageEl.style.width = '200px';
      } 

      private createCounterEl() {
        this.counterEl = document.createElement('div');
        this.counterEl.innerHTML = this.count;
      }

      private updateCounterEl() {
        this.counterEl.innerHTML = this.count;
      }

      private appendElements() {
        this.containerEl.appendChild(this.imageEl);
        this.containerEl.appendChild(this.counterEl);
      }

      private async getCatImg() {
        const url = `https://api.thecatapi.com/v1/images/search`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data[0]);
        this.img = data[0].url;

        this.createImageEl();
        this.createCounterEl();
        this.appendElements();
      }
    }

    // make 2 cats 
    const cat1 = new Cat();
    const cat2 = new Cat();
    console.log(cat1)
    //console.log(cat1.catEl);
    const app: any = document.querySelector('#app');

    if (app) {
      app.style.display = 'flex';
      app.style.gap = '10px';
      app.appendChild(cat1.catEl);
      app.appendChild(cat2.catEl);
    }

  },

  /* 
  Cat Clicker Premium Requirements

  Project Requirements for Cat Clicker Premium
  Visuals
  The application should display

  a list of at least 5 cats, listed by name
  an area to display the selected cat
  In the cat display area, the following should be displayed

  the cat's name
  a picture of the cat
  text showing the number of clicks
  The specifics of the layout do not matter, so style it however you'd like.

  Interaction
  When a cat name is clicked in the list, the cat display area should update to show the data for the selected cat.
  The number of clicks in the cat area should be unique to each cat, and should increment when the cat's picture is clicked.
  */

  catClicker3() {

    class Cat {
      static instances: Cat[] = [];
      private count: number;
      private name: string;
      private img: string;
      private _active: boolean;
      // container
      private containerEl: any;
      // image element
      private imageEl: any;
      // show counter element 
      private counterEl: any;
      // show name element
      private nameEl: any;
      private _callback: () => void;

      constructor() {
        // store each instance ever created
        Cat.instances.push(this);
        this._callback = () => {};
        this.count = 0;
        this.img = ''; 
        this.name = faker.internet.userName();
        this._active = false;
        this.getCatImg();

        this.createContainerEl();
        
        // in eventListener function: bound this with call or use arrowFunc
        this.containerEl.addEventListener('click', this.onClick);
      }

      // deactivate all the instances
      private static deactivateAll() {
        this.instances.forEach((cat:Cat) => {
          cat.deactivate();
          cat.catEl.classList.remove('active');
        });
      }

      public static getActiveCat() {
        return Cat.instances.find((cat:Cat) => cat.active === true);
      }

      public set callback(callback: () => void) {
        this._callback = callback;
      }

      public get active() {
        return this._active;
      }

      public activate = () => this._active = true;
      public deactivate = () => this._active = false;

      public increment() {
        this.count += 1;
        this.updateCounterEl();
      }

      public decrement() {
        if (this.count >= 0) this.count -= 1;
        this.updateCounterEl();
      }

      get catEl() {
        return this.containerEl;
      }

      private onClick = () => {
        Cat.deactivateAll();
        // activate the clicked instance
        this.activate();
        this.catEl.classList.add('active');
        console.log(this, Cat.instances);

        // do some stuff after cat is clicked
        this._callback();
      }

      private createContainerEl() {
        this.containerEl = document.createElement('div');
        this.containerEl.style.display = 'flex';
        this.containerEl.style.flexDirection = 'column';
        this.containerEl.style.gap = '10px';
        this.containerEl.style.cursor = 'pointer';
        this.containerEl.style.padding = '10px';
        //this.containerEl.style.width = '100%';
      }

      private createNameEl() {
        this.nameEl = document.createElement('p');
        this.nameEl.innerHTML = this.name;
      }

      private createImageEl() {
        this.imageEl = document.createElement('img');
        this.imageEl.src = this.img;
        this.imageEl.alt = 'cat image';
        this.imageEl.style.objectFit = 'cover';
        this.imageEl.style.width = '200px';
        this.imageEl.style.height = '200px';
      } 

      private createCounterEl() {
        this.counterEl = document.createElement('div');
        this.counterEl.innerHTML = this.count;
      }

      private updateCounterEl() {
        this.counterEl.innerHTML = this.count;
      }

      private appendElements() {
        this.containerEl.appendChild(this.imageEl);
        this.containerEl.appendChild(this.counterEl);
        this.containerEl.appendChild(this.nameEl);
      }

      private async getCatImg() {
        const url = `https://api.thecatapi.com/v1/images/search`;
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data[0]);
        this.img = data[0].url;

        this.createImageEl();
        this.createCounterEl();
        this.createNameEl();
        this.appendElements();
      }
    }

    const app: any = document.querySelector('#app');

    if (app) {

      function setActiceCat() {
        // set active cat
        const selectedCat:any = document.querySelector('.selected-cat'); 
        // clear
        selectedCat.innerHTML = '';
        // find active cat:
        const activeCat: Cat | undefined = Cat.getActiveCat();
        // make a copy, otherwise: you move the same elements
        if (activeCat) {
          const activeCatElCopy: any = activeCat.catEl.cloneNode(true);
          selectedCat.appendChild(activeCatElCopy);
        }
      }

      const cats: Cat[] = Array.from(new Array(10)).map((el:any) => new Cat());
      // set callback for each object
      cats.forEach((cat:Cat) => cat.callback = setActiceCat);

      const html = `
      
      <div
      style="
      display: flex;
      height: 100%;
      //background: red;
      "
      overflow: hidden;
      >
        <ul
        class='cats-list'
        style="
        display: flex;
        gap: 10px;
        flex-direction: column;
        background: lightblue;
        height: 100%;
        margin: 0;
        padding: 10px;
        flex: 0 0 40%;
        overflow-x: hidden;
        overflow-y: scroll;
        max-height: 90vh;
        "
        >
          <h2
          style="
          border-bottom: 2px solid black;
          "
          >
          list of cats:
          </h2>
        </ul>

        <div
        class='selected-cat'
        style="
        background: orange;
        flex: 1;
        padding: 10px;
        "
        >
          
        </div>
      </div>
      `

      const root: any = document.createElement('div');
      root.innerHTML = html.trim();

      app.appendChild(root);

      const catsList = document.querySelector('.cats-list');
      cats.forEach((cat: Cat) => catsList?.appendChild(cat.catEl));

      console.log(cats);
      // set active cat
      //setActiceCat();
    }
  },

  main() {
    //this.catClicker();
    //this.catClicker2();
    this.catClicker3();
  },
}

export default module1