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


import com.cl.dao.DiscussnongchanpinDao;
import com.cl.entity.DiscussnongchanpinEntity;
import com.cl.service.DiscussnongchanpinService;
import com.cl.entity.view.DiscussnongchanpinView;

@Service("discussnongchanpinService")
public class DiscussnongchanpinServiceImpl extends ServiceImpl<DiscussnongchanpinDao, DiscussnongchanpinEntity> implements DiscussnongchanpinService {
	
	
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<DiscussnongchanpinEntity> page = this.selectPage(
                new Query<DiscussnongchanpinEntity>(params).getPage(),
                new EntityWrapper<DiscussnongchanpinEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<DiscussnongchanpinEntity> wrapper) {
		  Page<DiscussnongchanpinView> page =new Query<DiscussnongchanpinView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
	@Override
	public List<DiscussnongchanpinView> selectListView(Wrapper<DiscussnongchanpinEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public DiscussnongchanpinView selectView(Wrapper<DiscussnongchanpinEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}


}
