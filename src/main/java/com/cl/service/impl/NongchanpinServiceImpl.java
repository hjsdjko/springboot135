package com.cl.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.List;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.cl.utils.PageUtils;
import com.cl.utils.Query;


import com.cl.dao.NongchanpinDao;
import com.cl.entity.NongchanpinEntity;
import com.cl.service.NongchanpinService;
import com.cl.entity.view.NongchanpinView;

@Service("nongchanpinService")
public class NongchanpinServiceImpl extends ServiceImpl<NongchanpinDao, NongchanpinEntity> implements NongchanpinService {
	
	
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<NongchanpinEntity> page = this.selectPage(
                new Query<NongchanpinEntity>(params).getPage(),
                new EntityWrapper<NongchanpinEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<NongchanpinEntity> wrapper) {
		  Page<NongchanpinView> page =new Query<NongchanpinView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
	@Override
	public List<NongchanpinView> selectListView(Wrapper<NongchanpinEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public NongchanpinView selectView(Wrapper<NongchanpinEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}


}
