
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

  main() {
    //this.catClicker();
    this.catClicker2();
  },
}

export default module1