import pytest
from fastapi.testclient import TestClient

from {{MODULE}} import create_app


@pytest.fixture
def client():
    # A fresh app (and fresh in-memory state) for every test.
    return TestClient(create_app())


def test_health(client):
    assert client.get("/health").status_code == 200


# One test per row of the API contract, plus the edge cases and failure modes in ../README.md.


@pytest.mark.skip(reason="write this test")
def test_happy_path(client):
    ...


@pytest.mark.skip(reason="write this test")
def test_rejects_invalid_input_with_400(client):
    ...
