import React, { Component, Suspense } from "react";
import axios from "axios";
import "./CreateCampaign.css";

class CreateCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      campaigns: [],
    };

    this.createCampaign = this.createCampaign.bind(this);
  }

  async componentDidMount() {
    const res = await axios({
      method: "GET",
      url: "/getCampaigns",
    });
    this.setState({ campaigns: res.data });
  }

  createCampaign = async (e) => {
    e.preventDefault();
    const resPost = await axios({
      method: "POST",
      data: {
        name: this.state.name,
      },
      withCredentials: true,
      url: "/createCampaign",
    });

    const res = await axios({
      method: "GET",
      url: "/getCampaigns",
    });
    this.setState({ campaigns: res.data });
    console.log(resPost.data);
  };

  render() {
    return (
      <div className="container-create-campaign">
        <h2 className="title-create-campaign">Crear una campaña</h2>
        <form onSubmit={this.createCampaign}>
          <input
            type="text"
            className={`username`}
            placeholder="Nombre de la campaña"
            name="name"
            onChange={(e) => this.setState({ name: e.target.value })}
            required
          />
          <p>Nota: crear una campaña generara cargos periodicos</p>
          <button type="submit" className="btn_register">
            Crear
          </button>
        </form>

        <h2 className="title-active-campaigns">Campañas activas</h2>
        <ul>
          {this.state.campaigns.map((campaign) => {
            return (
              <li key={campaign._id}>
                <p>{campaign.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default function App(props) {
  return (
    <Suspense fallback="loading">
      <CreateCampaign />
    </Suspense>
  );
}
