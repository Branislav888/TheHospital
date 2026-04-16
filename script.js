
(function() {
    function alignButtonsWithBuilding() {
        const btns = document.querySelectorAll('.but_level');
        if (btns.length) {
            void btns[0].offsetHeight;
        }
    }

    window.addEventListener('load', () => {
        alignButtonsWithBuilding();
        console.log("THE HOSPITAL – Choose a floor. Buttons rest on the building facade.");
    });
    
    window.addEventListener('resize', () => {
        setTimeout(alignButtonsWithBuilding, 20);
    });
})();