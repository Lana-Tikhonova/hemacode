document.addEventListener('DOMContentLoaded', () => {
    // AOS.init({
    //     easing: 'ease-in-out',
    //     delay: 100,
    //     once: true,
    //     duration: 700,
    //     offset: window.innerWidth < 577 ? 0 : 100,
    // });

    // document.querySelector('.menu_btn').addEventListener('click', function () {
    //     this.classList.toggle('active');
    //     document.querySelector('.mobile_menu').classList.toggle('active');
    // });


    $('.menu_btn').on('click', function () {
        $(this).toggleClass('active');
        $('.mobile_menu').toggleClass('active');
        $('body').toggleClass('locked');
        $('.btns_wrapper').toggleClass('hidden')
    });


    // маска для телефона
    const phoneInputs = document.querySelectorAll('.form_input[type="tel"]');
    phoneInputs.forEach(input => {
        IMask(input, {
            mask: '+{7}(000)000-00-00'
        })
    })

    const swiperHead = new Swiper(".head_slider", {
        slidesPerView: 1,
        spaceBetween: 16,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    const swiperTeam = new Swiper(".team_list", {
        slidesPerView: 'auto',
        spaceBetween: 16,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        breakpoints: {
            992: {
                slidesPerView: 'auto',
                spaceBetween: 30,
            },
        },
    });

    const swiperWhy = new Swiper(".why_slider", {
        slidesPerView: 1,
        spaceBetween: 16,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        allowTouchMove: false,
        loop: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
    });

    const swiperFull = new Swiper(".full_slider", {
        slidesPerView: 1,
        spaceBetween: 16,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    document.querySelectorAll('.reviews_slider_wrapper').forEach((wrapper) => {
        const sliderEl = wrapper.querySelector('.reviews_slider');
        const nextBtn = wrapper.querySelector('.swiper-button-next');
        const prevBtn = wrapper.querySelector('.swiper-button-prev');

        new Swiper(sliderEl, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            watchSlidesProgress: true,
            mousewheelControl: true,
            watchOverflow: true,
            watchSlidesVisibility: true,
            speed: 1000,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn
            },
            breakpoints: {
                1201: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    });


    const allTabs = document.querySelectorAll(".tabs");

    allTabs.forEach(tabsContainer => {
        const buttons = tabsContainer.querySelectorAll(".tab_btn");
        const panes = tabsContainer.querySelectorAll(".tab_pane");

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const targetTab = button.getAttribute("data-tab");

                buttons.forEach(btn => btn.classList.remove("active"));
                panes.forEach(pane => pane.classList.remove("active"));

                button.classList.add("active");

                const targetPane = tabsContainer.querySelector(`.tab_pane[data-tab-id="${targetTab}"]`);
                if (targetPane) {
                    targetPane.classList.add("active");
                } else {
                    console.warn(`Таб с data-tab-id="${targetTab}" не найден`);
                }
            });
        });
    });

    let questions = document.querySelectorAll('.faq_item .question');
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const parent = question.parentElement;
            const answer = parent.querySelector('.answer');

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                parent.classList.remove('active');
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                parent.classList.add('active');
            }
        });
    });

    // валидация телефона
    $.validator.addMethod("phoneRU", function (value, element) {
        const digits = value.replace(/\D/g, '');
        return this.optional(element) || digits.length === 11;
    }, "Введите корректный номер телефона");

    // jq валидация
    $('form.validate').each(function () {
        $(this).validate({
            errorPlacement: function (error, element) {
                error.appendTo(element.closest(".form_input_group"));
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass);
                $(element).closest('.form_input_group').addClass(errorClass);
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass);
                $(element).closest('.form_input_group').removeClass(errorClass);
            },
            rules: {
                agree: "required",
                phone: {
                    required: true,
                    phoneRU: true
                }
            },
            messages: {
                agree: "",
            }
        })
    });

    // видео
    const players = Array.from(document.querySelectorAll('.player_video')).map(
        (p) =>
            new Plyr(p, {
                controls: [
                    'play-large',
                    'play',
                    'progress',
                    'current-time',
                    'mute',
                    'volume',
                    'settings',
                    // 'share',     
                    // 'fullscreen', 
                ],
                autoplay: false,
            })
    );

    // останавливать видео, если включили другое
    players.forEach(player => {
        player.on('play', function () {

            players.forEach(otherPlayer => {
                if (otherPlayer !== player && !otherPlayer.paused) {
                    otherPlayer.pause();
                }
            });
        });
    });

    $('.player_video_bg_btn').on('click', function (e) {
        for (let index = 0; index < players.length; index++) {
            players[index].play();
        }
        $(this).parent().hide();
    });



})