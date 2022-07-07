# XrplGraph

Welcome to the XRPL graph. This is an expermental graph ql that fetches the account nfts and appends the IPFS data and the orders to the query.

## DEMO

You can preview the demo at `https://transia.co/xrplgraph`.

## Create ENV file

Rename the `.env.sample` to `.env`.

Add your IPFS url settings and your network. 

If no settings are set the application will NOT run.

## Install Repositories

```
yarn install
```

## Run Server

```
yarn run serve
```

# Example Client

There is an React example in the `examples` directory.

## Navigate to example

From base directory;

```
cd examples/react
```

## Install Repositories

```
yarn install
```

## Run Test Client

```
yarn run start
```

gcloud config configurations activate metaxrplorer
gcloud builds submit
