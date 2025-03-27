document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        root: null, 
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.2
        };
    

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("Intersecting: ", entry.target);
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
        

    }, observerOptions);

    document.querySelectorAll('.fade').forEach(element => {
        observer.observe(element);
    })
})