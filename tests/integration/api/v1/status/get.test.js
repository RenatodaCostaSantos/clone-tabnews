test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const { dependencies, updated_at} = await response.json();  
  const pgVersion = dependencies.database.version;
  const maxConnections = dependencies.database.max_connections;


  expect(updated_at).toBeDefined();
  const parsedUpdatedAt = new Date(updated_at).toISOString();
  expect(updated_at).toEqual(parsedUpdatedAt);

  expect(pgVersion).toBeDefined();
  expect(typeof pgVersion).toBe("string");
  expect(pgVersion.length).toBeGreaterThan(0);

  expect(maxConnections).toBeDefined();
  expect(typeof maxConnections).toBe("number");
  expect(maxConnections).toBeGreaterThan(0)
});

test("Obtain max connections from /api/v1/status ", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const { dependencies } = await response.json();  
  const activeConnections = dependencies.database.active_connections;

  expect(activeConnections).toBeDefined();
  expect(typeof activeConnections).toBe("number");
  expect(activeConnections).toBe(1)
});




