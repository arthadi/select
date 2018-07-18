
$(document).ready(function(){

    $.fn.selectbox = function () {

        this.each( () => {

        const $selectCont = $(this);
        const $select = $selectCont.children();
        const $selectOption = $select.children();
        let textOption = [];
        let classMainBlockSelect = $selectCont.attr("class");

        $selectOption.each(function(){
            let text_option = $(this).text();
            textOption.push(text_option);
        });

        $("<div/>", {
            "class": classMainBlockSelect + "_" + "select-box" + " " + "select-box",
            append: $("<button>",{
                "class": classMainBlockSelect + "_" + "arrow-select-link" + " " +  "arrow-select-link form__button",
                append: $("<span>",{
                    "class": classMainBlockSelect + "_" + "arrow-select" + " " + "arrow-select"
                })
          }).add ($("<p>", {
                "class": classMainBlockSelect + "_" + "select-box__value-tag" + " " + "select-box__value-tag",
                text: textOption[0]
            })).add($("<ul>", {
                "class": classMainBlockSelect + "_" + "select-menu-box" + " " + "select-menu-box"
            }))
        }).appendTo($selectCont);

        for (let i = 0; i < textOption.length; i++){
            $("<li>", {
                "class": classMainBlockSelect + "_" + "option" + " " + "option",
                append: $("<a>",{
                    "class": classMainBlockSelect + "_" + "option-link" + " " + "option-link link",
                    "href": "#",
                    "text": textOption[i]
                })
            }).appendTo($("." + classMainBlockSelect + "_" + "select-menu-box"));
        }
        $("select").css("display", "none");

        const $option = $(".option");
        const $arrow_select = $(".arrow-select-link");

        $arrow_select.on("click", (e) => {
            const parentBox = e.target.parentElement;
            const $selectMenuBox = parentBox.childNodes[2];
            const classSelectMenuBox = $selectMenuBox.classList[0];
            const $MenuBox = $("." + classSelectMenuBox);
            const classArrow = e.target.children[0].classList[0];
            let thisCurentHeight = parseInt($MenuBox.css("height"));

            if (thisCurentHeight === 0) {
                let height_menu = $MenuBox.css({"height":"auto"}).outerHeight();
                $MenuBox.css ({"height":"0"});
                $MenuBox.animate({"height": height_menu}, 300);
                $("." + classArrow).css({transition: ".2s", transform: "rotate(180deg)"});
                return false;
            }
            else {
                $MenuBox.animate ({"height": 0}, 300);
                $("." + classArrow).css({transition: ".2s", transform: "rotate(0deg)"});
                return false;
            }
        });

        $option.click ((e) => {
            const $mainBox = e.target.offsetParent.parentElement;
            const $ulClass = e.target.offsetParent.classList[0];
            const $text = e.target.text;
            const $classP = $mainBox.children[1].classList[0];
            const $classArrowBox = $mainBox.children[0].children[0].classList[0];

            e.preventDefault();
            $("." + $ulClass).animate({"height": 0}, 300);
            $("." + $classP).text($text);
            $("." + $classArrowBox).css({transition: ".2s", transform: "rotate(0deg)"});
        });
    });
};

    $('.main').selectbox();
    $('.main_all').selectbox();
});

