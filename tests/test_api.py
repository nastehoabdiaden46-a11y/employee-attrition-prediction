from fastapi.testclient import TestClient

from api.app import app


client = TestClient(app)


def test_root():
    response = client.get("/")

    assert response.status_code == 200

    assert response.json()["documentation"] == "/docs"


def test_health():
    response = client.get("/health")

    assert response.status_code == 200

    assert "model_loaded" in response.json()


def test_invalid_prediction_request():
    response = client.post(
        "/predict",
        json={
            "Age": 41
        },
    )

    assert response.status_code == 422