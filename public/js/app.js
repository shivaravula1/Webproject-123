class App {
    constructor(presentContainer, titleContainer) {
        this.presentContainer = presentContainer;
        this.titleContainer = titleContainer;

        this._onPresentOpened = this._onPresentOpened.bind(this);
        this._onChooseOtherPresent = this._onChooseOtherPresent.bind(this);

        this.presents = [];
        this._fillPresentContainer();
        this.openedCount = 0;

        // Create the "Choose Other Present" button, initially hidden
        this.button = document.createElement('button');
        this.button.textContent = "Didn't like the present? Choose Another";
        // Apply CSS styles
        this.button.style.backgroundColor = '#000';
        this.button.style.border = '1px solid #777';
        this.button.style.color = '#fff';
        this.button.style.borderRadius = '2px';
        this.button.style.fontFamily = 'inherit';
        this.button.style.fontSize = '21px';
        this.button.style.display = 'none';
        this.button.style.width = '100%';
        this.button.style.justifyContent = 'center';
        this.button.style.alignItems = 'center';
        this.button.style.padding = '20px';
        this.button.style.marginTop = '50px';
        this.button.style.marginBottom = '20px';
        // Append the button to the present container
        this.button.addEventListener('click', this._onChooseOtherPresent);
        this.presentContainer.appendChild(this.button);
    }

    _fillPresentContainer() {
        for (const source of PRESENT_SOURCES) {
            const present = new Present(this.presentContainer, source, this._onPresentOpened);
            this.presents.push(present);
        }
    }

    _onPresentOpened() {
        this.openedCount++;
        if (this.openedCount === 1) {
            this.titleContainer.textContent = 'Enjoy your present!';
            this.button.style.display = 'block';
        }
        if (this.openedCount === 2) {
            this.titleContainer.textContent = 'Enjoy your present!';
            this.button.style.display = 'block';
        }
        if (this.openedCount === 3) {
            this.titleContainer.textContent = 'Enjoy your present!';
            this.button.style.display = 'block';
        }
        if (this.openedCount === 4) {
            this.titleContainer.textContent = 'Enjoy your present!';
            this.button.style.display = 'block';
        }
        if (this.openedCount === 5) {
            this.titleContainer.textContent = 'All the gifts are opened';
            this.button.style.display = 'none';
        }
        
    }

    _onChooseOtherPresent() {
        this.titleContainer.textContent = 'Open other gift';
    }
}
