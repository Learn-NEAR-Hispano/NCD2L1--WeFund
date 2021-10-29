import { logging } from "near-sdk-as";
import { Context, ContractPromiseBatch, u128 } from "near-sdk-core"
import { people, Person, privateProjects, Project, publicProjects } from "./model"

@nearBindgen
export class Contract {

  register(): bool {
    const exists = people.get(Context.sender);
    if (exists) {
      logging.log("User already in network");
      return false;
    }
    people.set(Context.sender, new Person(Context.sender));
    return true;
  }

  createProject(name: string, description: string, goal: u64, isPublic: bool): bool {
    const user = people.get(Context.sender);

    if (!user) {
      logging.log("User not registered in the network");
      return false;
    }

    user.projects.add(name);

    var newProject = new Project(name, Context.sender, description, goal, isPublic);
    if (isPublic) {
      publicProjects.set(name, newProject);
      logging.log("public created");
    }

    privateProjects.set(name, newProject);
    return true;
  }

  getPublicProjects(): string {
    let projects: Array<string> = publicProjects.keys();
    return projects.join(",");
  }

  getPublicProject(id: string): string {
    let project: Project | null = publicProjects.get(id);
    if (project == null) {
      return "No project found";
    }
    return project.get();
  }

  addFriend(friendId: string): bool {
    const user = people.get(Context.sender);
    if (!user) {
      logging.log("User not registered in the network");
      return false;
    }

    const friend = people.get(friendId);
    if (!friend) {
      logging.log("Friend doesn't exist in the network");
      return false;
    }
    user.addFriend(friendId);
    return true;
  }

  getFriendProjects(friendId: string): string | null {
    const user = people.get(Context.sender);
    if (!user) {
      logging.log("User not registered in the network");
      return null;
    }

    if (!user.friends.has(friendId)) {
      logging.log("Friend doesn't exist");
      return null;
    }
    const friend = people.getSome(friendId);
    logging.log(friend.projects);

    let projects = friend.getProjects();
    logging.log(projects);
    return projects.join(",");
  }

  getFriendProject(friendId: string, name: string): string | null {
    const user = people.get(Context.sender);
    if (!user) {
      logging.log("User not registered in the network");
      return null;
    }

    if (!user.friends.has(friendId)) {
      logging.log("Friend doesn't exist");
      return null;
    }
    const friend = people.getSome(friendId);
    if (!friend.projects.has(name)) {
      logging.log("Friend doesn't have that project");
      return null;
    }

    let project: Project | null = privateProjects.get(name);
    if (project == null) {
      return "No project found";
    }
    return project.get();
  }

  @payable
  donatePublicProject(name: string): bool {
    const project = publicProjects.get(name);
    if (!project) {
      logging.log("Project doesn't exist");
      return false;
    }

    let strAmount = Context.attachedDeposit.toString();
    strAmount = strAmount.substr(0, strAmount.length - 24);
    const amount = U64.parseInt(strAmount);
    if (amount == 0) return false;
    let rsp = project.donate(amount);
    if (!rsp) return rsp;
    ContractPromiseBatch.create(project.ownerId).transfer(Context.attachedDeposit);
    publicProjects.set(name, project);
    if (privateProjects.contains(name)) {
      privateProjects.set(name, project);
    }
    return true;
  }

  @payable
  donateFriendProject(friendId: string, name: string): bool {
    const user = people.get(Context.sender);
    const friend = people.get(friendId);
    if (!user || !friend) {
      logging.log("User not registered in the network");
      return false;
    }

    const isFriend = user.friends.has(friendId);
    if (!isFriend) {
      logging.log("User is not your friend");
      return false;
    }

    const projectExists = friend.projects.has(name);
    if (!projectExists) {
      logging.log("Project doesn't exist");
      return false;
    }

    var project = privateProjects.getSome(name);

    let strAmount = Context.attachedDeposit.toString();
    strAmount = strAmount.substr(0, strAmount.length - 24);
    const amount = U64.parseInt(strAmount);
    if (amount == 0) return false;
    let rsp = project.donate(amount);
    if (!rsp) return rsp;
    ContractPromiseBatch.create(project.ownerId).transfer(Context.attachedDeposit);
    privateProjects.set(name, project);
    if (publicProjects.contains(name)) {
      publicProjects.set(name, project);
    }
    return true;
  }

  viewPeople(): string {
    let p = people.keys();
    return p.join(",");
  }

  getFriends(): string {
    const user = people.get(Context.sender);
    if (!user) {
      logging.log("User not registered in the network");
      return "";
    }

    let friends = user.friends.values();
    return friends.join(",");
  }

}