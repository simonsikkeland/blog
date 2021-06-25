(function ($) {
    'use strict';



    // Sticky Menu
    $(window).scroll(function () {
        if ($('.navigation').offset().top > 100) {
            $('.navigation').addClass('nav-bg');
        } else {
            $('.navigation').removeClass('nav-bg');
        }
    });

    // Background-images
    $('[data-background]').each(function () {
        $(this).css({
            'background-image': 'url(' + $(this).data('background') + ')'
        });
    });

    // background color
    $('[data-color]').each(function () {
        $(this).css({
            'background-color': $(this).data('color')
        });
    });

    // progress bar
    $('[data-progress]').each(function () {
        $(this).css({
            'bottom': $(this).data('progress')
        });
    });


    // /* ########################################### hero parallax ############################################## */
    // window.onload = function () {

    //     var parallaxBox = document.getElementById('parallax');
    //     var
    //         /* c1left = document.getElementById('l1').offsetLeft,
    //                    c1top = document.getElementById('l1').offsetTop, */
    //         c2left = document.getElementById('l2').offsetLeft,
    //         c2top = document.getElementById('l2').offsetTop,
    //         c3left = document.getElementById('l3').offsetLeft,
    //         c3top = document.getElementById('l3').offsetTop,
    //         c4left = document.getElementById('l4').offsetLeft,
    //         c4top = document.getElementById('l4').offsetTop,
    //         c5left = document.getElementById('l5').offsetLeft,
    //         c5top = document.getElementById('l5').offsetTop,
    //         c6left = document.getElementById('l6').offsetLeft,
    //         c6top = document.getElementById('l6').offsetTop,
    //         c7left = document.getElementById('l7').offsetLeft,
    //         c7top = document.getElementById('l7').offsetTop,
    //         c8left = document.getElementById('l8').offsetLeft,
    //         c8top = document.getElementById('l8').offsetTop,
    //         c9left = document.getElementById('l9').offsetLeft,
    //         c9top = document.getElementById('l9').offsetTop;

    //     parallaxBox.onmousemove = function (event) {
    //         event = event || window.event;
    //         var x = event.clientX - parallaxBox.offsetLeft,
    //             y = event.clientY - parallaxBox.offsetTop;

    //         /*  mouseParallax('l1', c1left, c1top, x, y, 5); */
    //         mouseParallax('l2', c2left, c2top, x, y, 25);
    //         mouseParallax('l3', c3left, c3top, x, y, 20);
    //         mouseParallax('l4', c4left, c4top, x, y, 35);
    //         mouseParallax('l5', c5left, c5top, x, y, 30);
    //         mouseParallax('l6', c6left, c6top, x, y, 45);
    //         mouseParallax('l7', c7left, c7top, x, y, 30);
    //         mouseParallax('l8', c8left, c8top, x, y, 25);
    //         mouseParallax('l9', c9left, c9top, x, y, 40);
    //     };

    // };

    // function mouseParallax(id, left, top, mouseX, mouseY, speed) {
    //     var obj = document.getElementById(id);
    //     var parentObj = obj.parentNode,
    //         containerWidth = parseInt(parentObj.offsetWidth),
    //         containerHeight = parseInt(parentObj.offsetHeight);
    //     obj.style.left = left - (((mouseX - (parseInt(obj.offsetWidth) / 2 + left)) / containerWidth) * speed) + 'px';
    //     obj.style.top = top - (((mouseY - (parseInt(obj.offsetHeight) / 2 + top)) / containerHeight) * speed) + 'px';
    // }
    // /* ########################################### /hero parallax ############################################## */

    // testimonial-slider
    $('.testimonial-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        arrows: false,
        adaptiveHeight: true
    });

    async function generate_topology_svg(conf = { random: d3.randomUniform(0,1) , points: 100, color: "#ffa855", height: 600})
    {

        var height = conf.height
        var width = 800
        var margin = ({top: 20, right: 30, bottom: 30, left: 40})

        const sqrt3 = 3; //Math.sqrt(10);
        var data = [].concat(
            Array.from({length: conf.points}, () => ({x: conf.random() + sqrt3, y: conf.random()})),
            Array.from({length: conf.points}, () => ({x: conf.random() - sqrt3, y: conf.random()})),
            Array.from({length: conf.points}, () => ({x: conf.random(), y: conf.random()+2}))
        );

        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, height]);

        var x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x)).nice()
            .rangeRound([margin.left, width - margin.right])

        var y = d3.scaleLinear()
            .domain(d3.extent(data, d => d.y)).nice()
            .rangeRound([height - margin.bottom, margin.top])

        var contours = d3.contourDensity()
            .x(d => x(d.x))
            .y(d => y(d.y))
            .size([width, height])
            .bandwidth(30)
            .thresholds(30)
        (data)

        svg.append("g")
            .attr("fill", "none")
            .attr("stroke", conf.color)
            .attr("stroke-linejoin", "round")
        .selectAll("path")
        .data(contours)
        .join("path")
            .attr("stroke-width", (d, i) => i % 5 ? 0.25 : 1)
            .attr("d", d3.geoPath());

        svg.append("g")
            .attr("stroke", "white")
        .selectAll("circle")
        .data(data)
        .join("circle")
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y));
            // .attr("r", 2);

        return svg.node();
    }

    // contour plot hero
    async function generate_contour_hero() {
        var contour_plot_container = document.getElementById("contour-plot-hero")
        if (contour_plot_container == null)
            {return null}

        const svg_node = await generate_topology_svg({random: d3.randomNormal(0, 7),
                                                      points: 15,
                                                      color:"#ffa855",
                                                      height: 600})

        contour_plot_container.classList.add('fade-in');

        contour_plot_container.appendChild(svg_node);
    }
    // contour plot bg
    async function generate_contour_bg() {
        var contour_plot_container = document.getElementById("contour-bg-body")
        if (contour_plot_container == null)
            {return null}

        const svg_node = await generate_topology_svg({random: d3.randomUniform(0, 100),
                                                      points: 10,
                                                      color: "#ffa855",
                                                      height: 1200})

        contour_plot_container.classList.add('fade-in');

        contour_plot_container.appendChild(svg_node);
    }

    window.onload = function(){
        generate_contour_hero();
        generate_contour_bg();
    };

    // clients logo slider
    $('.client-logo-slider').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        arrows: false,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Shuffle js filter and masonry
    var Shuffle = window.Shuffle;
    var jQuery = window.jQuery;

    var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
        itemSelector: '.shuffle-item',
        buffer: 1
    });

    jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
        var input = evt.currentTarget;
        if (input.checked) {
            myShuffle.filter(input.value);
        }
    });



})(jQuery);
