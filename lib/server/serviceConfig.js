ServiceConfiguration.configurations.upsert(
    { service: "facebook" },
      {
        $set: {
          appId: "442572199236703",
          loginStyle: "popup",
          secret: "91ac94b88c3ceabf6dec283fa0ed2b22"
        }
      }
);