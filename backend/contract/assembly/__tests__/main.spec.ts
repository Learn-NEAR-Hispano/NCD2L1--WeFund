import {
    Contract
} from '..';

import {
    Person,
    Project,
    publicProjects,
    privateProjects,
    people
} from '../model';
import { Context } from 'near-sdk-as';

var CONTRACT = new Contract();

describe('register', () => {
    it('should resgiter the user', () => {
        const result = CONTRACT.register();
        expect(result).toBe(true);
    });
})

describe('viewPeople', () => {
    it('should view the registered user', () => {
        const exists = CONTRACT.register();
        expect(exists).toBe(true);
        const result = CONTRACT.viewPeople();
        expect(result).toBe(Context.sender.toString());
    });
})

describe('getFriends', () => {
    it('should view the cvs of user friends', () => {
        const exists = CONTRACT.register();
        expect(exists).toBe(true);
        const user = people.getSome(Context.sender);
        user.friends.add("friend1");
        user.friends.add("friend2");
        const result = CONTRACT.getFriends();
        expect(result).toBe("friend1,friend2");
    });
})

describe('createProject', () => {
    it('should create a new project', () => {
        const exists = CONTRACT.register();
        expect(exists).toBe(true);
        const result = CONTRACT.createProject("test", "test desc", 10, true);
        expect(result).toBe(true);
    });
})

describe('getPublicProject', () => {
    it('should get a created public project', () => {
        const exists = CONTRACT.register();
        expect(exists).toBe(true);
        const result = CONTRACT.createProject("test", "test desc", 10, true);
        expect(result).toBe(true);
        const projectDesc = CONTRACT.getPublicProject("test");
        expect(projectDesc).toBe("test : test desc. Reached: 0");
    });
})