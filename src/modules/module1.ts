
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

  main() {
    this.catClicker();
  },
}

export default module1