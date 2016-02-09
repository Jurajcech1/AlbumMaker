Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :albums, only: [:index, :create, :show, :destroy]
    resources :photos, only: [:index, :create, :show]
  end
  resource :session, only: [:create, :destroy, :new]
  resources :users, only: [:create, :new]
  root to: "static_pages#root"
end
