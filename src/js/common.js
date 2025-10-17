document.addEventListener('DOMContentLoaded', () => {
    $(".information_block_scroll").overlayScrollbars({
        className: "os-theme-dark",
        scrollbars: {
            clickScrolling: true,
            visibility: "auto",
        }
    });

    let founders = $(".founders_block");
    if (founders.length) {
        const instance = founders.find('.content_body_scroll').overlayScrollbars({
            className: "os-theme-dark",
            scrollbars: {
                clickScrolling: true,
                visibility: "auto",
            }
        }).overlayScrollbars();

        const scrollEl = instance.getElements().viewport;

        scrollEl.addEventListener('scroll', () => {
            const scrollTop = scrollEl.scrollTop;
            const scrollHeight = scrollEl.scrollHeight;
            const clientHeight = scrollEl.clientHeight;

            if (scrollTop + clientHeight >= scrollHeight - 5) {
                founders.addClass('end_scroll')
            } else {
                founders.removeClass('end_scroll');
            }
        });
    }


    AOS.init({
        easing: 'ease-in-out',
        delay: 100,
        once: true,
        duration: 700,
        offset: window.innerWidth < 577 ? 0 : 100,
    });

    $('.menu_btn').on('click', function () {
        $(this).toggleClass('active');
        $('.mobile_menu').toggleClass('active');
        $('body').toggleClass('locked');
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


    const swiperProcesses = new Swiper(".processes_slider", {
        slidesPerView: 'auto',
        spaceBetween: 8,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        speed: 1000,
        // pagination: {
        //     el: ".swiper-pagination",
        //     type: "progressbar",
        // },
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
        },
        breakpoints: {
            576: {
                spaceBetween: 24,
            },
        }
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
                tel: {
                    required: true,
                    phoneRU: true
                }
            },
            messages: {
                agree: "",
            }
        })
    });

    // // видео
    // const players = Array.from(document.querySelectorAll('.player_video')).map(
    //     (p) =>
    //         new Plyr(p, {
    //             controls: [
    //                 'play-large',
    //                 'play',
    //                 'progress',
    //                 'current-time',
    //                 'mute',
    //                 'volume',
    //                 'settings',
    //                 // 'share',     
    //                 // 'fullscreen', 
    //             ],
    //             autoplay: false,
    //         })
    // );

    // // останавливать видео, если включили другое
    // players.forEach(player => {
    //     player.on('play', function () {

    //         players.forEach(otherPlayer => {
    //             if (otherPlayer !== player && !otherPlayer.paused) {
    //                 otherPlayer.pause();
    //             }
    //         });
    //     });
    // });

    // // запускать видео при клике на обложку
    // $('.player_video_bg_btn').on('click', function (e) {
    //     for (let index = 0; index < players.length; index++) {
    //         players[index].play();
    //     }
    //     $(this).parent().hide();
    // });

    Fancybox.bind("[data-fancybox]");

    $('.hidden_block_btn').on('click', function () {
        $(this).closest('.hidden_block_wrapper').find(".hidden_block").slideToggle();
        $(this).toggleClass('active');
    });


    document.querySelectorAll(".chart_item path").forEach(path => {
        const id = path.id;

        // при наведении на сектор
        path.addEventListener("mouseenter", () => {
            // поднимаем сектор наверх
            path.parentNode.appendChild(path);
            // находим связанный пункт
            const li = document.querySelector(`[data-chart="${id}"]`);
            li?.classList.add("active");
        });

        path.addEventListener("mouseleave", () => {
            const li = document.querySelector(`[data-chart="${id}"]`);
            li?.classList.remove("active");
        });
    });

    tippy('[data-tippy-content]', {
        followCursor: true,
        arrow: false
    });



})