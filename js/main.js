

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');



let unlock = true;

const timeout = 1000;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupId = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupId);
            popupOpen(curentPopup);
            e.preventDefault()
        })

    }
}


function popupOpen(crPopup) {
    if (crPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false)
        } else {
            bodyLock();
        }
        crPopup.classList.add('open');
        crPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'))
            }
        }
        )
    }
}


const popupCloseIcon = document.querySelectorAll('.close-popup');

console.log(popupCloseIcon)

if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault
        })
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyOnLock()
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.body').offsetWidth + 'px';

    if (lockPadding.length > 0) {

        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;

    }, timeout)

}

function bodyOnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px'
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock')

    }, timeout)

    unlock = false;
    setTimeout(function () {
        unlock = true;

    }, timeout)
}

document.addEventListener("keydown", function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive)
    }
})