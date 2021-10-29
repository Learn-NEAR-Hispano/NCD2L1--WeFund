import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FriendsTable from "./FriendsTable";
import ProjectTable from "./ProjectTable";
import FriendsProjectTable from "./FriendsProjectTable";
import { addFriend, createProject } from "../utils/near-utils";
import {
  getFriends,
  getPublicProjects,
  registerUser,
} from "../utils/near-utils";

const Dashboard = ({ wallet, account }) => {
  const [publicProjects, setPublicProjects] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendProjects, setfriendProjects] = useState([]);
  const [newFriendId, setNewFriendId] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [newProjectGoal, setNewProjectGoal] = useState("");
  const [newProjectPublic, setNewProjectPublic] = useState(false);
  const handleProjectPublic = () => setNewProjectPublic(true);
  const handleProjecvPriv = () => setNewProjectPublic(false);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [showFriendForm, setShowFriendForm] = useState(false);
  const handleCloseFriend = () => setShowFriendForm(false);
  const handleShowFriend = () => setShowFriendForm(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const handleCloseProject = () => setShowProjectForm(false);
  const handleShowProject = () => setShowProjectForm(true);

  const handleNewFriend = async()=>{
    const friend = {
      "friendId": newFriendId
    }

    const result = await addFriend(wallet, friend)
    const {
      status: {SuccessValue},
    } = result;
    console.log(atob(SuccessValue));
  }

  const handleNewProject = async() =>{
    const project = {
      "name": newProjectName,
      "description": newProjectDesc,
      "goal" : newProjectGoal,
      "isPublic":newProjectPublic
    }
    const result = await createProject(wallet, project)
    const {
      status: {SuccessValue},
    } = result;
    console.log(atob(SuccessValue));
  }

  useEffect(() => {
    (async () => {
      try {
        const rsp = await registerUser(wallet);
        console.log(rsp);
        var result = await getPublicProjects(wallet);
        var {
          status: { SuccessValue },
        } = result;
        setPublicProjects(atob(SuccessValue).replace(/"/g, "").split(","));
        result = await getFriends(wallet);
        var {
          status: { SuccessValue },
        } = result;
        setFriends(atob(SuccessValue).replace(/"/g, "").split(","));
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <h1>Hi: {account.accountId}!</h1>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <Button variant="outline-primary" onClick={handleShowFriend}>
            Add friend
          </Button>
          <Modal show={showFriendForm} onHide={handleCloseFriend}>
            <Modal.Header closeButton>
              <Modal.Title>Add a new friend</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col> 
                  <label>
                    Friend's ID:    
                  </label>
                </Col>
                <Col>
                  <input type = "text" onChange = {(e)=>setNewFriendId(e.target.value)}/>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick = {handleCloseFriend}>Cancel</Button>
              <Button variant="primary" onClick = {handleNewFriend}>Submit</Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col md="4">
          <Button variant="outline-danger" onClick={() => wallet.signOut()}>
            Sign Out
          </Button>
        </Col>
        <Col md="4">
          <Button variant="outline-success" onClick={handleShowProject}>
            Create project
          </Button>
          <Modal show={showProjectForm} onHide={handleCloseProject}>
            <Modal.Header closeButton>
              <Modal.Title>Create a new project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <label>
                    Project name:    
                  </label>
                </Col>
                <Col>
                  <input type = "text" onChange = {(e)=>setNewProjectName(e.target.value)}/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>
                    Description:    
                  </label>
                </Col>
                <Col>
                  <textarea onChange = {(e)=>setNewProjectDesc(e.target.value)}/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>
                    Goal:    
                  </label>
                </Col>
                <Col>
                  <input type = "text" onChange = {(e)=>setNewProjectGoal(e.target.value)}/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>
                    Public
                  </label>
                </Col>
                <Col>
                  <input type="checkbox"
                      checked = {newProjectPublic}
                      onChange = {()=>setNewProjectPublic(!newProjectPublic)}
                    />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick = {handleCloseProject}>Cancel</Button>
              <Button variant="primary" onClick = {handleNewProject}>Submit</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <h2>Friends</h2>
          <FriendsTable
            data={friends}
            updateTable={setfriendProjects}
            updateSelected={setSelectedFriend}
            wallet={wallet}
          />
        </Col>
        <Col md="4">
          <h2>Friend project</h2>
          <FriendsProjectTable data={friendProjects} friendId={selectedFriend} wallet={wallet} />
        </Col>
        <Col md="4">
          <h2>Public Projects</h2>
          <ProjectTable data={publicProjects} wallet={wallet} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
