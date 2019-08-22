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
        it('Are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        // Check is allFeeds has defined URL and not empty
        let feeds;
        beforeEach(() => {
            feeds = allFeeds;
        });

        it("Is All feeds contain url", () => {
            feeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });

        });


        // Check is allFeeds has defined name and not empty
        it("Is All feeds contain names", () => {
            feeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    /* Menu Testing */
    describe("The Menu", () => {
         // Test when page loaded the menu is hidden and visible when menu icon is clicked 
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

    /* Initial Entries Test */
    describe("Initial Entries", () => {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        // Async testing to checking data is loaded and  visible 
        beforeEach((done) => {
            loadFeed(0, done);
        });
        it("Is load feed completed ", (done) => {
            // When feed class has children that mean it's not empty 
            // expect(feedClass.children.length).toBeGreaterThan(0);
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });


    });


    /* New Feed Selection */

    describe("New Feed Selection", () => {
        // When categories change check data is change .
        let oldFeed, newFeed;
        beforeEach((done) => {
            loadFeed(0, () => {
                oldFeed = document.querySelector('.feed').textContent;
                loadFeed(1, () => {
                    newFeed = document.querySelector('.feed').textContent;
                    done();
                })
            });
        });
        it('Content is changed', (done) => {
            expect(oldFeed).not.toEqual(newFeed);
            done();
        });

    });
}());
