import { updateObject, stripHTMLTags, toHttps, groupByShallowProperty, toBritishDate, isDateInFuture } from './utilities';

describe('Update object tests', () => {
    it('UpdateObject should create new object with updated properties', () => {
        //Arrange
        let obj1 = { Name: 'Derick', Age: 2, Occupation: 'Developer' };
        let updatedProperties = { Age: 3, Occupation: 'Builder' };

        //Act
        let updatedObject = updateObject(obj1, updatedProperties);

        //Assert
        expect(updatedObject.Name).toBe(obj1.Name);
        expect(updatedObject.Age).toBe(updatedProperties.Age);
        expect(updatedObject.Occupation).toBe(updatedProperties.Occupation);

        expect(obj1.Name).toBe('Derick');
        expect(obj1.Age).toBe(2);
        expect(obj1.Occupation).toBe('Developer');
    })
})

describe('Strip HTML tags tests', () => {
    it('stripHTMLTags should strip tags where necessary', () => {
        //Arrange
        let htmlString = `<h1>This is a title</h1><script>console.log('test')</script> This is a string`;

        //Act
        let strippedString = stripHTMLTags(htmlString);

        //Assert
        expect(strippedString).toBe(`This is a titleconsole.log('test') This is a string`);
    })

    it('stripHTMLTags should not affect strings with no HTML', () => {
        //Arrange
        let normalString = 'This is a normal string, there should be no ammendments made';

        //Act
        let strippedString = stripHTMLTags(normalString);

        //Arrange
        expect(normalString).toBe(strippedString);
    })
})

describe('To Https tests', () => {
    it('toHttps should transform a url to use https', () => {
        //Arrange
        let url = 'http://www.test.com';

        //Act
        let transformedUrl = toHttps(url);

        //Assert
        expect(transformedUrl).toBe('https://www.test.com');
    })

    it('toHttps should NOT transform a url with https', () => {
        //Arrange
        let url = 'https://www.test.com';

        //Act
        let transformedUrl = toHttps(url);

        //Assert
        expect(transformedUrl).toBe(url);
    })
})

describe('Group By Shallow Property tests', () => {
    it('groupByShallowProperty should properly group objects', () => {
        //Arrange
        let collection = [
            { Name: 'Chris', Age: 18, Occupation: 'President' },
            { Name: 'Donald', Age: 19, Occupation: 'King' },
            { Name: 'Max', Age: 18, Occupation: 'Developer' },
            { Name: 'Jervis', Age: 17, Occupation: 'Doctor' },
            { Name: 'Molly', Age: 18, Occupation: 'Dentist' },
            { Name: 'Sam', Age: 19, Occupation: 'Vet' },
            { Name: 'Felicity', Age: 17, Occupation: 'Lawyer' },
            { Name: 'Sona', Age: 18, Occupation: 'Architect' },
            { Name: 'Dan', Age: 19, Occupation: 'Manager' },
        ]

        //Act
        let groupings = groupByShallowProperty(collection, 'Age');

        //Assert
        expect(groupings.filter(x => x.key === 18)[0].groupedCollection.length).toBe(4);
        expect(groupings.filter(x => x.key === 17)[0].groupedCollection.length).toBe(2);
        expect(groupings.filter(x => x.key === 19)[0].groupedCollection.length).toBe(3);
    })
})

describe('To British Date tests', () => {
    it('toBritishDate should convert date to British date', () => {
        //Arrange
        let date = '2020-10-01';

        //Act
        let britishDate = toBritishDate(date);

        //Assert
        expect(britishDate).toBe('01/10/2020');
    })

    it('toBritishDate should return message if date is invalid', () => {
        //Arrange
        let badDate = 'bad';

        //Act
        let response = toBritishDate(badDate);

        //ASsert
        expect(response).toBe('No available date');
    })
})

describe('Is Date in Future tests', () => {
    it('isDateInFuture should return false if date is in the past', () => {
        //Arrange
        let date = '2020-01-02';

        //Act
        let response = isDateInFuture(date);

        //Assert
        expect(response).toBe(false);
    })

    it('isDateInFuture should return true if date is in the future', () => {
        //Arrange
        let dateNow = new Date();
        let futureDate = `${dateNow.getUTCFullYear() + 1}-${dateNow.getMonth()}-${dateNow.getDate()}`

        //Act
        let response = isDateInFuture(futureDate);

        //ASsert
        expect(response).toBe(true);
    })

    it('isDateInFuture should return true if date is now', () => {
        //Arrange
        let dateNow = new Date();

        //Act
        let response = isDateInFuture(dateNow.toISOString());

        //ASsert
        expect(response).toBe(true);
    })

    it('isDateInFuture should return false if date is invalid', () => {
        //Arrange
        let badDate = 'bad';

        //Act
        let response = isDateInFuture(badDate);

        //ASsert
        expect(response).toBe(false);
    })
})