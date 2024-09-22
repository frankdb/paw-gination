import pytest
from app import app
import requests_mock

def test_get_dogs():
    with app.test_client() as client:
        with requests_mock.Mocker() as m:
            m.get('https://interview-wheat.vercel.app/api/dogs?page=1', json=[
                {"name": "Buddy", "breed": "Labrador"},
                {"name": "Max", "breed": "German Shepherd"}
            ])
            
            response = client.get('/api/dogs')
            assert response.status_code == 200
            data = response.get_json()
            assert len(data) == 2
            assert data[0]['name'] == 'Buddy'
            assert data[1]['breed'] == 'German Shepherd'

        with requests_mock.Mocker() as m:
            m.get('https://interview-wheat.vercel.app/api/dogs?page=1', status_code=500)
            
            response = client.get('/api/dogs')
            assert response.status_code == 500
            data = response.get_json()
            assert 'error' in data

def test_get_dogs_with_page():
    with app.test_client() as client:
        with requests_mock.Mocker() as m:
            m.get('https://interview-wheat.vercel.app/api/dogs?page=2', json=[
                {"name": "Charlie", "breed": "Golden Retriever"},
                {"name": "Luna", "breed": "Husky"}
            ])
            
            response = client.get('/api/dogs?page=2')
            assert response.status_code == 200
            data = response.get_json()
            assert len(data) == 2
            assert data[0]['name'] == 'Charlie'
            assert data[1]['breed'] == 'Husky'