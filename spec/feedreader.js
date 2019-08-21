/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        var feeds;
        beforeEach(() => {
            feeds = allFeeds;
        });

        it("Is All feeds contain url", () => {
            feeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });

        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it("Is All feeds contain names", () => {
            feeds.forEach((feed) => {
                expect(feed.name).not.toBe('');
            });
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe("The Menu", () => {
        // let id = document.querySelector('.menu-icon-link');
        // id.addEventListener('click',e =>{
        //     console.log(e);
        // });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */


        let body = document.querySelector('body');
        let menuEvent = document.querySelector('.menu-icon-link');

        it('Dose menu hidden', () => {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
        it('Dose menu Icon clicked ', () => {
            menuEvent.dispatchEvent(new Event('click'));
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuEvent.dispatchEvent(new Event('click'));
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", () => {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach((done) => {
            loadFeed(0, done);
        });
        let feedClass = document.querySelector('.feed');
        it("is load feed completed ", (done) => {
            // When feed class has children that mean it's not empty 
            expect(feedClass.children.length).toBeGreaterThan(0);
            // expect($('.feed').has('.entry').length).toBeGreaterThan(0);
            done();
        });


    });


    /* TODO: Write a new test suite named "New Feed Selection" */

    describe("New Feed Selection", () => {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        let preTitle, preEntry;
        let currentTitle, currentEntry;
        beforeEach((done) => {
            loadFeed(0, () => {
                let headerTitle = document.querySelector('.header-title').textContent;
                let entry = document.querySelector('.entry').children[0].textContent;
                preTitle = headerTitle;
                preEntry = entry;
            });
            loadFeed(1, () => {
                let headerTitle = document.querySelector('.header-title').textContent;
                let entry = document.querySelector('.entry').children[0].textContent;
                currentTitle = headerTitle;
                currentEntry = entry;
                done();
            })
        });
        it('Content is changed', (done) => {
            expect(preTitle).not.toEqual(currentTitle);
            expect(preEntry).not.toEqual(currentEntry);
            done();
        });

    });



}());