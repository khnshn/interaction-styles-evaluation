<script>





    var sectionChangerEl = document.getElementById('hsectionchanger');
    var sectionChanger = tau.widget.SectionChanger(sectionChangerEl, {
        circular: false,
        orientation: 'horizontal',
        useBouncingEffect: true
    });

    document.addEventListener('rotarydetent', function(ev) {
        var direction = ev.detail.direction;
        if (direction === 'CW') {
            sectionChanger.next();
        } else if (direction === 'CCW') {
            sectionChanger.prev();
        }
    });
</script>
