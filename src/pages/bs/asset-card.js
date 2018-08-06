const { component } = capsid
const MajorAccountTypeCard = require('./major-account-type-card')

@component('asset-card')
class AssetCard extends MajorAccountTypeCard {
  title () {
    return t10.t('domain.assets')
  }

  majorAccountType (MajorAccountType) {
    return MajorAccountType.ASSET
  }
}

module.exports = AssetCard
